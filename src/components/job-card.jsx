import { Heart, MapIcon, MapPinIcon, Trash2Icon } from "lucide-react";
import {Button} from "./ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";


import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";


const JobCard = ({
    job,
    savedInit = false,
    onJobAction = () => {},
    isMyJob = false,
}) => {
     console.log("Job prop:", job);

     const {user} = useUser()
  return (

    <Card>
         <CardHeader>
         <CardTitle>
        {job?.title || "No title"}
         {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
              onClick={handleDeleteJob}
            />
          )}
         </CardTitle>
         </CardHeader>

         <CardContent>
            <div>
                {job && <img src={job.company.logo_url}className="h-6"/>}
            </div>
            <div className="flex gap-1 py-2">
                <MapPinIcon size={17} /> {job.location}
            </div>
            {job.description}
         </CardContent>
         <CardFooter>
            <Link to={`/job/${job.id}`}></Link>
            <Button variant="secondary">
                More Details
            </Button>
         </CardFooter>
        
    </Card>
    
  )
}

export default JobCard