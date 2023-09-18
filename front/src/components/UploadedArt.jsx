import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContextProvider";
import Loader from "./Loader";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function UploadedArt({ Art,idValue }) {
  const {id}=useParams()
  const { ready } = useContext(UserContext);
  const [menu, setmenu] = useState(false);
  // if (!ready) {
  //   return (
  //     <div className="">
  //       <Loader />
  //     </div>
  //   );
  // }

  function DeletePost(){
    axios.delete("/newArtboard/"+idValue)
    window.location.reload()
  }

  return (
    <div className="h-[25rem] relative w-[18rem] bg-[#D83449] rounded-xl cursor-pointer mb-8" >
      <img
        src={`https://feeditapp.onrender.com/uploads/art/${Art.art}`}
        className="h-full object-cover absolute w-[18rem] rounded-xl "
      />
      <div className="bg-[#1e1e1e41] opacity-[0%] hover:opacity-[100%] h-[25rem] relative w-[18rem] rounded-xl transition-opacity duration-100 ease-in">
        <h1 className="p-4 text-white">{Art.title}</h1>
        <div
          onClick={() => setmenu(!menu)}
          className="absolute right-2 p-1 text-white top-3 hover:origin-center hover:rotate-90 transition ease-in-out duration-150 rounded-full hover:bg-white hover:text-[#D83449]"
        >
          <DragHandleIcon />
        </div>
        {menu ? 
          <div className="absolute top-12 right-0 h-[6rem] w-[6rem] rounded-lg p-2 bg-white flex justify-center items-center ">
            <div className="text-center">
              <Link to={`editArt/${idValue}`}>Edit</Link>
              <button onClick={DeletePost} className="mt-2 p-2 bg-[#D83449] text-white rounded-md">
                Delete
              </button>
            </div>
          </div>
         : null}
        <p className=" w-[90%] p-4 text-white absolute bottom-2 truncate">{Art.desc}</p>
      </div>
    </div>
  );
}

export default UploadedArt;
