import { AccountCircle, InsertPhoto, Photo } from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../UserContextProvider";
import { Navigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";

function ProfileForm() {
  const fileInputRef = useRef(null);
  const [redirect,setRedirect]=useState(false)
  const [input, setInput] = useState({
    FirstName: "",
    LastName: "",
    Desc: "",
    UserName: "",
    thumbphotos: "",
    profilephotos: "",
  });

  const { ready,user } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get("/creatoprofile/" + id).then((res) => {
        const data = res.data;
        setInput({
          FirstName: data.firstname,
          LastName: data.lastname,
          UserName: data.username,
          thumbphotos: data.thumbphotos,
          profilephotos: data.profilephotos,
          Desc: data.desc,
        });
      });
    }
  }, [user]);

  if (!ready) {
    return <div className="mt-12">
      <Loader/>
    </div>;
  }
  function getInput(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (id) {
      axios.put("/createprofile", { id, input });
    } else {
      axios.post("/createprofile", {
        FirstName: input.FirstName,
        LastName: input.LastName,
        UserName: input.UserName,
        ThumbPhotos: input.thumbphotos,
        ProfilePhotos: input.profilephotos,
        Desc: input.Desc,
      })
    }
    setRedirect(true)

  }

  if(redirect && ready){
    return <Navigate to={"/home"}/>
  }

  async function uploadThumbPhoto(e) {
    e.preventDefault();
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }
    try {
      const res = await axios.post("/imagethumbUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { data: filenames } = res;
      setInput((preValue) => ({
        ...preValue,
        thumbphotos: filenames,
      }));
    } catch (err) {
      console.log(err);
    }
  }

  async function uploadProfilePhoto(e) {
    e.preventDefault();
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }
    try {
      const res = await axios.post("/imageprofileUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { data: filenames } = res;
      setInput((preValue) => ({
        ...preValue,
        profilephotos: filenames,
      }));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-center mt-5">
        <form
          method="post"
          onSubmit={handleSubmit}
          className=" w-[90%] h-[90%] shadow-xl p-5 rounded-lg mb-8"
        >
          <div className="grid grid-row-2 sm:grid-cols-2 mb-5">
            <div className="w-[100%] p-5 relative">
              <h1 className="text-[1.5rem] mb-8 font-semibold text-[#D84339]">
                Upload Cover
              </h1>
              <label>
                <div className="relative border-[2px] border-dashed border-[#D84339] flex justify-center items-center w-full h-[20rem] rounded-lg text-[#8d8d8d] cursor-pointer">
                  <input
                    type="file"
                    onChange={uploadThumbPhoto}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <InsertPhoto />
                  Upload Thumbnail
                </div>
                {input?.thumbphotos?.length > 0 && (
                  <span className="truncate">
                    <Photo />
                    {input?.thumbphotos}
                  </span>
                )}
              </label>
            </div>
            <div className="w-[100%] p-5">
              <h1 className="text-[1.5rem] mb-8 font-semibold text-[#D84339]">
                Upload Profile
              </h1>
              <label>
                <div className="relative border-[2px] border-dashed border-[#D84339] flex justify-center items-center w-full h-[20rem] rounded-lg text-[#8d8d8d] cursor-pointer">
                  <input
                    type="file"
                    onChange={uploadProfilePhoto}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <AccountCircle />
                  Upload Pofile
                </div>
                {input?.profilephotos?.length > 0 && (
                  <span className="truncate">
                    <Photo />
                    {input?.profilephotos}
                  </span>
                )}
              </label>
            </div>
          </div>
          <div className="grid grid-rows-4">
            <div className="w-full p-5">
              <label>First Name</label>
              <input
                onChange={getInput}
                type="text"
                placeholder="First Name"
                name="FirstName"
                value={input.FirstName}
                className="border-[1px] bg-[#f8f8f8] border-[#1E1E1E] rounded-md mt-2 pl-3 p-2 w-full"
              />
            </div>
            <div className="w-full p-5">
              <label>Last Name</label>
              <input
                onChange={getInput}
                type="text"
                placeholder="Last Name"
                name="LastName"
                value={input.LastName}
                className="border-[1px] bg-[#f8f8f8] border-[#1E1E1E] rounded-md mt-2 pl-3 p-2 w-full"
              />
            </div>
            <div className="w-full p-5">
              <label>UserName</label>
              <input
                onChange={getInput}
                type="text"
                placeholder="UserName"
                name="UserName"
                value={input.UserName}
                className="border-[1px] bg-[#f8f8f8] border-[#1E1E1E] rounded-md mt-2 pl-3 p-2 w-full"
              />
            </div>
            <div className="w-full p-5">
              <label>Description</label>
              <input
                onChange={getInput}
                type="text"
                placeholder="Description"
                name="Desc"
                value={input.Desc}
                className="border-[1px] bg-[#f8f8f8] border-[#1E1E1E] rounded-md mt-2 pl-3 p-2 w-full"
              />
            </div>
          </div>
          <button className="mt-5 w-full p-3 rounded-lg text-white bg-[#D84339]">
            Done!
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
