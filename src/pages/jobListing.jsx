import React from 'react'
import UseEffect from "../hooks/useEffect"
import {getJobs} from "../api/apiJobs"
import {useEffect,useState} from "react"
import {useUser} from "@clerk/clerk-react"
import { BarLoader } from 'react-spinners'
import JobCard from "../components/job-card"

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();
  
   const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
     } = UseEffect(getJobs, {
    location,
    company_id,
    searchQuery,
  });

    useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
    
  }, [isLoaded,location, company_id, searchQuery]);

  if(!isLoaded){
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
 
  return (
    <div>
      <h1 className='font-extrabold flex justify-center text-center text-6xl sm:text-7xl p-10'  >
        Latest Jobs 
      </h1>
    
     {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => (
            
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              
            ))
          ) : (
            <div>No Jobs Found </div>
          )}
        </div>
      )}
    </div>
  )
}

export default JobListing