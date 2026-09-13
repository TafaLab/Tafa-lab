import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function supabaseForToken(token:string){
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL,anon=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if(!url||!anon)return null;
  return createClient(url,anon,{auth:{persistSession:false,autoRefreshToken:false},global:{headers:{Authorization:`Bearer ${token}`}}});
}

function supabaseForAdmin(){
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!key)return null;
  return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
}

export async function GET(request:Request){
  try{
    const authorization=request.headers.get("authorization")||"",token=authorization.replace(/^Bearer\s+/i,"").trim();
    if(!token)return NextResponse.json({error:"unauthorized"},{status:401});
    const tokenClient=supabaseForToken(token);
    if(!tokenClient)return NextResponse.json({error:"server_not_configured"},{status:500});
    const {data:{user},error:authError}=await tokenClient.auth.getUser(token);
    if(authError||!user)return NextResponse.json({error:"unauthorized"},{status:401});
    // The route already requires a valid authenticated CRM session. Prefer
    // the server client so a stale hard-coded Supabase user ID or RLS policy
    // cannot turn a real request list into an empty response.
    const supabase=supabaseForAdmin()||tokenClient;
    const [{data:leadRows,error:leadError},{data:orderRows,error:orderError}]=await Promise.all([
      supabase.from("stk_lab_leads").select("*").order("created_at",{ascending:false}),
      // Demo-site enquiries are stored in the bakery `orders` table by the
      // demo forms. They belong in the working Tafa Lab requests inbox too.
      supabase.from("orders").select("*").eq("weight","DEMO_SITE_ORDER").order("created_at",{ascending:false}),
    ]);
    if(leadError){console.error("Tafa Lab leads load:",leadError.message);return NextResponse.json({error:"load_failed"},{status:500});}
    // The bakery `orders` table may have a stricter RLS policy in some
    // environments. Never hide the real Tafa Lab leads because that optional
    // source is unavailable.
    if(orderError)console.error("Tafa Lab demo requests load:",orderError.message);

    const demoLeads=(orderError?[]:(orderRows||[])).map((order:any)=>{
      let payload:any={};
      try{payload=order.customer_comment?JSON.parse(order.customer_comment):{};}catch{}
      return {
        id:`order-${order.id}`,
        created_at:order.created_at,
        name:order.customer_name||"Без имени",
        contact:order.customer_phone||order.customer_email||"Контакт не указан",
        company:null,
        project_type:payload.subject||"Заявка с демо-сайта",
        message:payload.message||null,
        locale:payload.locale==="en"?"en":"ru",
        source_path:payload.siteName?`Демо · ${payload.siteName}`:"Демо-сайт",
        status:"new",
        admin_notes:null,
      };
    });
    return NextResponse.json({leads:[...(leadRows||[]),...demoLeads]},{headers:{"Cache-Control":"no-store"}});
  }catch(error){console.error("Tafa Lab leads GET:",error);return NextResponse.json({error:"load_failed"},{status:500});}
}

const clean=(v:unknown,max:number)=>typeof v==="string"?v.trim().slice(0,max):"";
const attempts=new Map<string,number[]>();
const WINDOW_MS=10*60*1000;
const MAX_ATTEMPTS=5;

export async function POST(request:Request){
  try{
    if(!request.headers.get("content-type")?.includes("application/json")){
      return NextResponse.json({error:"unsupported_media_type"},{status:415});
    }
    const body=await request.json();
    if(clean(body.website,200))return NextResponse.json({ok:true});
    const startedAt=typeof body.startedAt==="number"?body.startedAt:0;
    const now=Date.now();
    if(!startedAt||now-startedAt<1200||now-startedAt>2*60*60*1000){
      return NextResponse.json({error:"invalid_submission"},{status:400});
    }
    const forwarded=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const clientKey=forwarded||request.headers.get("x-real-ip")||"unknown";
    const recent=(attempts.get(clientKey)??[]).filter(time=>now-time<WINDOW_MS);
    if(recent.length>=MAX_ATTEMPTS)return NextResponse.json({error:"rate_limited"},{status:429});
    attempts.set(clientKey,[...recent,now]);
    const name=clean(body.name,100),contact=clean(body.contact,180);
    if(!name||!contact)return NextResponse.json({error:"name_and_contact_required"},{status:400});
    const url=process.env.NEXT_PUBLIC_SUPABASE_URL,anon=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if(!url||!anon)return NextResponse.json({error:"server_not_configured"},{status:500});
    const supabase=createClient(url,anon,{auth:{persistSession:false,autoRefreshToken:false}});
    const {error}=await supabase.from("stk_lab_leads").insert({
      name,contact,company:clean(body.company,160)||null,project_type:clean(body.projectType,120)||null,
      message:clean(body.message,3000)||null,locale:body.locale==="en"?"en":"ru",
      source_path:clean(body.sourcePath,500)||null,status:"new"
    });
    if(error){console.error("Tafa Lab lead insert:",error.message);return NextResponse.json({error:"save_failed"},{status:500});}
    return NextResponse.json({ok:true},{status:201});
  }catch(error){console.error(error);return NextResponse.json({error:"bad_request"},{status:400});}
}
