import { Person } from "@mui/icons-material";
import React from "react";
import { Link, useParams } from "react-router-dom";

function ArtPost({Art}) {

  return (
    <div className="mt-4 w-full">
      <div className="block h-auto shadow-md p-4 md:flex rounded-xl">
        <div className="rounded-2xl h-auto md:w-[50%] sm:h-[60%] md:h-[80%]">
            <img src={`https://feeditapp.onrender.com/uploads/art/${Art.art}`} alt="" className="rounded-2xl object-cover h-full md:w-full" />
        </div>
        <div className="block md:ml-10 md:w-[60%]">
          <h1 className="md:text-[3rem] text-[2rem] font-bold">{Art.title}</h1>
          <h3 className="md:text-[1.3rem] text-[1rem] text-gray-400 font-medium">
            {Art.desc}
          </h3>
          <Link to={`/profile/${Art?.owner?.username}/id=${Art?.owner?._id}`}>
          <div className="md:mt-14 mt-10 md:w-[85%] w-[95%] mb-4 rounded-xl bg-gray-200 p-5 relative">
            <h2 className="text-[1rem] text-gray-700 flex items-center">Fed By{"->"} <span className="text-[1rem] md:text-[1.5rem] text-[#D83449] font-medium">{Art?.owner?.username}</span>.</h2>
            <div className="rounded-full h-[3rem] w-[3rem] absolute right-3 top-4">
                {Art?.owner?.profilephotos ? <img src={`https://feeditapp.onrender.com/uploads/profile/${Art?.owner?.profilephotos}`} className="rounded-full h-full w-full object-cover" />:<Person/>}
            </div>
            <p className="text-gray-400 text-[.7rem]">Visit Profile</p>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArtPost;
