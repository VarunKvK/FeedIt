import { Person } from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContextProvider";
import MasonryLayout from "../components/MasonryLayout";

function UserPage() {
  const { user } = useContext(UserContext);
  const [profile, getProfile] = useState();
  const { id } = useParams();
  const profileId = id.slice(3);

  useEffect(() => {
    axios.get("/userPage/" + profileId).then((res) => {
      getProfile(res.data);
    });
  }, [profileId]);
  return (
    <div className="w-full h-screen">
      <div className="flex justify-center w-full h-[47%] relative">
        {profile?.[0].owner?.thumbphotos ? (
          <div className="h-[15rem] w-[60%] relative mt-5 rounded-xl flex justify-center items-center shadow-md bg-[#D84339]">
            <img
              className="object-cover h-full w-full rounded-xl"
              src={`https://feeditapp.onrender.com/uploads/thumb/${profile?.[0].owner?.thumbphotos}`}
              alt=""
            />
          </div>
        ) : (
          <div className="h-[15rem] w-[60%] relative mt-5 rounded-xl shadow-md bg-[#D84339]"></div>
        )}
        {profile?.[0].owner?.profilephotos ? (
          <div className="h-[5rem] w-[5rem] rounded-full shadow-lg bg-[#a7a7a7] absolute bottom-8 flex justify-center items-center">
            <img
              className="object-cover h-full w-full rounded-full"
              src={`https://feeditapp.onrender.com/uploads/profile/${profile?.[0].owner?.profilephotos}`}
              alt=""
            />
          </div>
        ) : (
          <div className="h-[5rem] w-[5rem] rounded-full shadow-lg bg-[#a7a7a7] absolute bottom-8 flex justify-center items-center">
            <Person className="text-white h-[2.5rem] w-[2.5rem]" />
          </div>
        )}

        {profile?.[0].owner?.username ? (
          <h1 className="flex items-center justify-center w-full text-[2rem] absolute -bottom-3">
            {profile?.[0].owner?.username}
          </h1>
        ) : (
          <h1 className="flex items-center justify-center w-full text-[2rem] absolute -bottom-3">
            {user?.username}
          </h1>
        )}
        {profile?.[0].owner?.desc ? (
          <h1 className="flex items-center justify-center text-[#1E1E1E] w-full text-[1rem] absolute -bottom-9">
            {profile?.[0].owner?.desc}
          </h1>
        ) : null}
      </div>
      <div className="w-full mt-[4rem] flex justify-center">
        <div className="grid sm:grid-cols-2 gap-4 lg:grid-cols-3 place-items-center">
          {profile?.map((data, index) => {
            return (
              <Link
                to={`/home/art/${data?.owner?._id}/${data?.title}/${data?._id}`}
              >
                <MasonryLayout Data={data} key={index} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
