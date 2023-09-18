import React, { useContext, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { CloseRounded, Person, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContextProvider";
import axios from "axios";

function ResponsiveNav({ setclose, open, setmenuclose, Logout }) {
  const { user } = useContext(UserContext);
  const [userInput,getUserInput]=useState()
  useEffect(()=>{
    axios.get("/createprofile").then((res)=>{
      getUserInput(res.data[0])
    })
  },[user])

  return (
    <div>
      <div
        onClick={() => {
          setclose(true);
          setmenuclose(false);
        }}
        className="block relative left-5 md:hidden cursor-pointer"
      >
        <MenuIcon />
      </div>
      {open ? (
        <div
          className={
            open
              ? "bg-white absolute flex md:hidden justify-center z-50 w-[95%] left-[.8rem] shadow-md rounded-lg p-4 top-[5.4rem] opacity-[100%] animate-[topDown_.5s_ease-in-out]"
              : null
          }
        >
          <div className="w-full grid gap-4 text-center">
            <CloseRounded
              onClick={() => setclose(false)}
              className="text-center w-full relative left-[47%] cursor-pointer hover:scale-125 transition ease-in-out duration-[.5s]"
            />
            <Link
              to={"/home"}
              onClick={() => setclose(false)}
              className="text-center bg-[#f5f5f5] rounded-lg py-2 hover:text-white hover:bg-[#c9c9c9]  w-[100%] cursor-pointer transition ease-in-out duration-[.5s]"
            >
              Home
            </Link>
            <Link
              to={"/profile/"+userInput?._id+"/newArtBoard"}
              onClick={() => setclose(false)}
              className="text-center bg-[#f5f5f5]  rounded-lg py-2 hover:text-white hover:bg-[#c9c9c9]  w-[100%] cursor-pointer transition ease-in-out duration-[.5s]"
            >
              Create
            </Link>
            <Link
              className="text-center bg-[#f5f5f5]  rounded-lg py-2 hover:text-white hover:bg-[#c9c9c9]  w-[100%] cursor-pointer transition ease-in-out duration-[.5s]"
              to={"/profile/"+userInput?._id}
              onClick={() => setclose(false)}
            >
              Profile
            </Link>
            <Link
              className="text-center bg-[#f5f5f5]  rounded-lg py-2 hover:text-white hover:bg-[#c9c9c9]  w-[100%] cursor-pointer transition ease-in-out duration-[.5s]"
              to={"/faq"}
              onClick={() => setclose(false)}
            >
              Faq
            </Link>
            <button
              className="w-full rounded-lg text-center text-white bg-[#D84339] py-2"
              onClick={() => {
                setclose(false);
                Logout()
              }}
            >
              Logout
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ResponsiveNav;
