import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export const runtime = "nodejs";
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
    if(clean(body.website,200)) return NextResponse.json({ok:true});
    const startedAt=typeof body.startedAt==="number"?body.startedAt:0;
    const now=Date.now();
    if(!startedAt||now-startedAt<1200||now-startedAt>2*60*60*1000){
      return NextResponse.json({error:"invalid_submission"},{status:400});
    }
    const forwarded=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const clientKey=forwarded||request.headers.get("x-real-ip")||"unknown";
    const recent=(attempts.get(clientKey)??[]).filter(time=>now-time<WINDOW_MS);
    if(recent.length>=MAX_ATTEMPTS){
      return NextResponse.json({error:"rate_limited"},{status:429});
    }
    attempts.set(clientKey,[...recent,now]);
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
