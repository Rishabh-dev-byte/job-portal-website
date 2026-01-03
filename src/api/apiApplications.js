export async function applyJobs(token,_,jobData){
  
  const supabase = await supabaseClient(token);
  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`
    let {error:applyjoberror} = await supabase.storage
    .from("resumes")
    .upload(fileName,jobData.resume)
    
    if (applyjoberror) {
    console.error("Error applyjoberror Job:", applyjoberror);
    return null;
  }
  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;
   const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();
     if (error) {
    console.error(error);
    throw new Error("Error submitting Application");
  }

  return data; 
}