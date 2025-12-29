import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";

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
     const[saved,toSave] = useState(savedInit)
     const {user} = useUser
  return (
    <card>
        <CardHeader>
            <CardTitle>
                {job.title}
                 {isMyJob && (
                 <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
              onClick={handleDeleteJob}
              />)}
            </CardTitle>
        </CardHeader>
        <CardContent>
        
        </CardContent>
    </card>
  )
}

export default JobCard