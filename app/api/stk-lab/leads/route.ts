import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export const runtime = "nodejs";
const clean=(v:unknown,max:number)=>typeof v==="string"?v.trim().slice(0,max):"";
export async function POST(request:Request){
  try{
    const body=await request.json();
    if(clean(body.website,200)) return NextResponse.json({ok:true});
    const name=clean(body.name,100),contact=clean(body.contact,180);
    if(!name||!contact) return NextResponse.json({error:"name_and_contact_required"},{status:400});
    const url=process.env.NEXT_PUBLIC_SUPABASE_URL,anon=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if(!url||!anon) return NextResponse.json({error:"server_not_configured"},{status:500});
    const supabase=createClient(url,anon,{auth:{persistSession:false,autoRefreshToken:false}});
    const {error}=await supabase.from("stk_lab_leads").insert({
      name,contact,company:clean(body.company,160)||null,project_type:clean(body.projectType,120)||null,
      message:clean(body.message,3000)||null,locale:body.locale==="en"?"en":"ru",
      source_path:clean(body.sourcePath,500)||null,status:"new"
    });
    if(error){console.error("STK Lab lead insert:",error.message);return NextResponse.json({error:"save_failed"},{status:500});}
    return NextResponse.json({ok:true},{status:201});
  }catch(e){console.error(e);return NextResponse.json({error:"bad_request"},{status:400});}
}
