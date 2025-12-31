import supabaseClient from "../utils/supabase.js"

export async function getJobs(token,{location,company_id,searchQuery}){
  const supabase = await supabaseClient(token);
  

  let query =   supabase.from("job").select("*,saved: saved_job(id), company: companies(name,logo_url)");
  
   if(location){
    query=query.eq("location",location)
   }

   if(company_id){
    query=query.eq("company_id",company_id)
   }

    if(searchQuery){
   query = query.ilike("title", `%${searchQuery}%`);

   }
    
    const { data, error } = await query;


   
   if(error){
    console.log("the error is",error)
    return null
    }

  return data;
}

export async function saveJobs(token,{alreadySaved},saveData){
  const supabase = await supabaseClient(token);
    
    if(alreadySaved){
      const { data, error:deleteError } = await supabase
       .from("saved_job")
       .delete()
       .eq("job_id",saveData.job_id)
      
       if(deleteError){
        console.log("the deleteError is",deleteError)
       }
       return data
    }
  
      else{
       const { data, error:insertError } = await supabase
       .from("saved_job")
       .insert([saveData])
       .select()
       
       if(insertError){
        console.log("the insertError is",insertError)
       }
       return data
       }

}