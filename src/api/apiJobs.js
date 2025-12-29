import supabaseClient from "../utils/supabase.js"

export async function getJobs(token,{location,company_id,searchQuery}){
  const supabase = await supabaseClient(token);

  let query = supabase.from("jobs").select("*,company:companies(name,logo,url),saved:saved_job(id)")

  if(location){
    query = query.eq("location",location)
   }
   
   if(company_id){
    query = query.eq("company_id",company_id)
   }
   
   if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
   }
  
   const {data,error} = await query
   
  if(error){
    console.log("the error is",error)
    return null
  }

  return data;
}