import React from 'react'
import UseFetch from "../hooks/useEffect"
import {getJobs} from "../api/apiJobs"
import {useEffect,useState} from "react"
import {useUser} from "@clerk/clerk-react"
import { BarLoader } from 'react-spinners'
import JobCard from "../components/job-card"
import {Input} from "../components/ui/input"
import {Button} from "../components/ui/button"
import { getCompany } from '@/api/apiCompanies'
import { State } from "country-state-city";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();
  
   const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
     } = UseFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

    useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
    
  }, [isLoaded,location, company_id, searchQuery]);

  const {
    
    data: cndata,
    fn: fncompany,
     } = UseFetch(getCompany, {
    location,
    company_id,
    searchQuery,
  });
   useEffect(() => {
    
      fncompany();
    
  });
  const clearFilters = () =>{
    setSearchQuery("")
    setLocation("")
    setCompany_id("")

  }

  if(!isLoaded){
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    console.log(query)
    if (query) setSearchQuery(query);
  };
  return (
    <div className=''>
      <h1 className='font-extrabold flex justify-center text-center text-6xl sm:text-7xl p-10'  >
        Latest Jobs 
      </h1>
      <form
        onSubmit={handleSearch}
        className="h-14 flex flex-row w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title.."
          name="search-query"
          className="h-full flex-1  px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>
       <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {cndata?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className="sm:w-1/2"
          variant="destructive"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>

        {loadingJobs === false && (
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5 ">
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