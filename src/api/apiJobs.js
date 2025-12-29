import supabaseClient from "../utils/supabase.js"

export async function getJobs(token,{location,company_id,searchQuery}){
  const supabase = await supabaseClient(token);
  

  let query = supabase.from("job").select("*,saved: saved_job(id), company: companies(name,logo_url)");
  

   const { data, error } = await query;


   
  if(error){
    console.log("the error is",error)
    return null
  }

  return data;
}