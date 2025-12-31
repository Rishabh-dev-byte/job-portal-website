import supabaseClient from "../utils/supabase.js"

export async function getCompany(token){
  const supabase = await supabaseClient(token);
  

  let query =  await supabase.from("companies").select("*");
  
   
    
    const { data, error } = query;


   
   if(error){
    console.log("the error is",error)
    return null
    }

  return data;
}

