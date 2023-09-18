import React from "react";
import { Link } from "react-router-dom";

function HomeArtContainer({ input }) {
  return (
    <div className="h-[34rem] md:p-2">
      <Link to={`art/${input.title}/${input._id}`}>
      <div className="shadow-lg h-[30rem] w-[20rem] md:w-[15rem] rounded-2xl cursor-pointer">
        <img
          src={`https://feeditapp.onrender.com/uploads/art/${input.art}`}
          className="h-[30rem] object-cover absolute w-[20rem] md:w-[15rem] rounded-2xl"
        />
        <div className="bg-[#1e1e1e41] opacity-[0%] hover:opacity-[100%] h-[30rem] relative w-[20rem] md:w-[15rem] rounded-2xl transition-opacity duration-100 ease-in">
          <h1 className="p-4 text-white">{input.title}</h1>
          <p className=" w-[90%] p-4 text-white absolute bottom-2 truncate">
            {input.desc}
          </p>
        </div>
        <div className="flex items-center mt-2">
          <div className="h-[2rem] w-[2rem] rounded-full shadow-lg">
            <img src={`https://feeditapp.onrender.com/uploads/profile/${input.owner.profilephotos}`} alt="" className="h-full object-cover rounded-full shadow-lg w-full" />
          </div>
          <div className="ml-2">
            <p>{input.owner.username}</p>
          </div>
        </div>
      </div>
          </Link>
    </div>
  );
}
export default HomeArtContainer;
