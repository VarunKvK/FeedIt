import React, { useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Add, Person } from "@mui/icons-material";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContextProvider";
import Loader from "../components/Loader";
import CreateNew from "../components/CreateNew";
import UploadedArt from "../components/UploadedArt";

function Profile() {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const { ready, user } = useContext(UserContext);
  const [input, getInput] = useState();
  const [art, getArt] = useState();
  useEffect(() => {
    axios.get("/createprofile").then((res) => {
      getInput(res.data[0]);
    });
  }, [user]);

  useEffect(() => {
    axios.get("/newArtboard").then((res) => {
      getArt(res);
    });
  }, [id]);
  // if (!ready) {
  //   return (
  //     <>
  //       <Loader />
  //     </>
  //   );
  // }

  function handleProfile(e) {
    e.preventDefault();
    if (id) {
      window.location.href = "/profile/editprofile/" + id;
    } else {
      window.location = "/profile/editprofile";
    }
  }

  return (
    <div className="w-full h-screen ">
      <div className="flex justify-center w-full h-[47%] relative">
        {input?.thumbphotos ? (
          <div className="h-[15rem] w-[60%] relative mt-5 rounded-xl flex justify-center items-center shadow-md bg-[#D84339]">
            <img
              className="object-cover h-full w-full rounded-xl"
              src={`https://feeditapp.onrender.com/uploads/thumb/${input?.thumbphotos}`}
              alt=""
            />
            <button
              onClick={handleProfile}
              className="absolute hover:bg-[#808080af] cursor-pointer  right-2 top-2 bg-[#80808073] flex justify-center items-center text-white h-[2.5rem] w-[2.5rem] rounded-md"
            >
              <EditIcon className="" />
            </button>
          </div>
        ) : (
          <div className="h-[15rem] w-[60%] relative mt-5 rounded-xl shadow-md bg-[#D84339]">
            <button
              onClick={handleProfile}
              className="absolute hover:bg-[#808080af] cursor-pointer  right-2 top-2 bg-[#80808073] flex justify-center items-center text-white h-[2.5rem] w-[2.5rem] rounded-md"
            >
              <EditIcon className="" />
            </button>
          </div>
        )}
        {input?.profilephotos ? (
          <div className="h-[5rem] w-[5rem] rounded-full shadow-lg bg-[#a7a7a7] absolute bottom-8 flex justify-center items-center">
            <img
              className="object-cover h-full w-full rounded-full"
              src={`https://feeditapp.onrender.com/uploads/profile/${input?.profilephotos}`}
              alt=""
            />
          </div>
        ) : (
          <div className="h-[5rem] w-[5rem] rounded-full shadow-lg bg-[#a7a7a7] absolute bottom-8 flex justify-center items-center">
            <Person className="text-white h-[2.5rem] w-[2.5rem]" />
          </div>
        )}

        {input?.username ? (
          <h1 className="flex items-center justify-center w-full text-[2rem] absolute -bottom-3">
            {input?.username}
            <button
              onClick={handleProfile}
              className="relative left-4 hover:text-black cursor-pointer text-[#1E1E1E]"
            >
              <EditIcon className="" />
            </button>
          </h1>
        ) : (
          <h1 className="flex items-center justify-center w-full text-[2rem] absolute -bottom-3">
            {user?.username}
            <button
              onClick={handleProfile}
              className="relative left-4 hover:text-black cursor-pointer text-[#1E1E1E]"
            >
              <EditIcon className="" />
            </button>
          </h1>
        )}
        {input?.desc ? (
          <h1 className="flex items-center justify-center text-[#1E1E1E] w-full text-[1rem] absolute -bottom-9">
            {input?.desc}
          </h1>
        ) : null}
      </div>
      {id ? (
        <CreateNew id={id} />
      ) : (
        <div className="grid place-items-center">
          <h1 className="w-full text-[3rem] font-medium mt-10 text-center text-gray-300">
            Create Your Profile
          </h1>
          <Link className="p-4 rounded-lg mt-4 bg-[#D83449] text-white text-center" to={"/profile/editprofile"}>Create Profile</Link>
        </div>
      )}
      <div className="w-full mt-8 flex justify-center">
        <div className="grid sm:grid-cols-2 gap-4 lg:grid-cols-3 place-items-center">
          {art?.data?.length > 0 &&
            art?.data?.map((data, index) => {
              return <UploadedArt Art={data} key={index} idValue={data._id} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
