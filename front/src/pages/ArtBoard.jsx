import {
  Add,
  AddPhotoAlternate,
  Close,
  DeleteForever,
  Send,
} from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContextProvider";
import Loader from "../components/Loader";

function ArtBoard() {
  const { id } = useParams();
  const { ready, user } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [profile,setprofile]=useState()
  const [input, setInput] = useState({
    artboard: "",
    title: "",
    desc: "",
    tagdata: [],
    art: "",
  });
  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get("/editartboard/" + id).then((res) => {
        const data = res.data;
        if (data) {
          setInput({
            artboard: data.artboard,
            title: data.title,
            desc: data.desc,
            tagdata: [...data.tags],
            art: data.art,
          });
          setprofile(data.owner);
        } else {
          console.error("Received invalid data:", data);
        }
      });
    }
  },[]);
  if (!ready) {
    return (
      <div className="mt-12">
        <Loader />
      </div>
    );
  }

  function getInput(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (profile) {
      axios.put("/newArtboard", { id, input });
      window.location=`/profile/${profile}`
    } else {
      axios.post("/newArtboard", { user,id, input });
      setRedirect(true);
    }
  }
  const handleInputKeyPress = (event) => {
    setInput((prev) => {
      const tagdata = [...prev.tagdata, input.tags];
      return { ...prev, tagdata, tags: "" };
    });
  };
  const removeTag = (tagToRemove) => {
    const updatedTags = input.tagdata.filter((tag) => tag !== tagToRemove);
    setInput((prev) => {
      return { ...prev, tagdata: updatedTags };
    });
  };

  async function uploadImage(e) {
    e.preventDefault();
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }

    const res = await axios.post("/artImage", formData, {
      headers: {
        "Content-Type": "form-data",
      },
    });
    const { data: filenames } = res;
    setInput((prev) => ({
      ...prev,
      art: filenames,
    }));
  }

  function deletePhoto() {
    axios
      .delete(`/deleteImage/${input.art}`)
      .then(() => {
        setInput((prev) => ({
          ...prev,
          art: "",
        }));
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  }

  if (redirect) {
    return <Navigate to={`/profile/${id}`} />;
  }
  return (
    <div>
      <div className="flex justify-center items-center w-full">
        <form action="post" className="w-full p-10 md:p-0 md:w-[76%]" onSubmit={handleSubmit}>
          <div className="flex items-center relative rounded-2xl  border-[1px] mt-8 border-black p-10 w-full">
            <Link
              className="hidden sm:block absolute left-5 bg-[#D83449] text-white rounded-lg py-4 px-8"
              to={"/profile/" + profile + "/newArtBoard"}
            >
              Create New
            </Link>
            <Link
              className="flex justify-center items-center sm:hidden absolute left-5 bg-[#D83449] text-white rounded-full sm:rounded-lg py-4 px-8"
              to={"/profile/" + profile + "/newArtBoard"}
            >
              <Add />
            </Link>
            <button className="absolute right-5 bg-[#D83449] text-white rounded-full sm:rounded-lg py-4 px-8 cursor-pointer">
              Publish
            </button>
          </div>
          <div className="mt-5 w-full">
            <div className="w-full mb-8 flex items-center justify-center">
              <label className="text-[1.2rem] sm:text-[1.5rem] font-regular mr-4">
                Name of ArtBoard
              </label>
              <input
                value={input.artboard}
                onChange={getInput}
                name="artboard"
                type="text"
                placeholder="ArtBoard"
                className="px-2 py-[.1rem] sm:py-1 border-b-[1px] border-black w-[50%] focus:outline-none"
              />
            </div>
            <div className="w-full block md:flex">
              <div className="w-full h-[30rem] md:h-[20rem] md:w-[50%] relative text-center">
                {input?.art?.length > 0 ? (
                  <div className="h-[30rem] sm:h-full rounded-lg shadow-lg relative">
                    <img
                      src={`http://localhost:8000/uploads/art/${input.art}`}
                      className="object-cover w-full rounded-lg h-full"
                      alt={input.art}
                    />
                    <div className="p-2 cursor-pointer bg-white rounded-md absolute top-3 left-3">
                      <DeleteForever
                        onClick={() => deletePhoto(input.art)}
                        className="text-[#D83449]"
                      />
                    </div>
                  </div>
                ) : (
                  <label>
                    <div className="rounded-lg h-full sm:h-[23rem] cursor-pointer bg-[#ececec] border-[1px] border-[black] border-dashed flex justify-center items-center">
                      <input
                        className="hidden"
                        onChange={uploadImage}
                        type="file"
                      />
                      <span className="flex items-center text-center text-[#a3a3a3]">
                        <AddPhotoAlternate />
                        Upload Your Art..
                      </span>
                    </div>
                  </label>
                )}
              </div>
              <div className="w-full mt-4 sm:mt-16 md:mt-0 md:ml-[2rem]">
                <div className="w-full mb-5">
                  <label className="text-[1.5rem] font-regular">Title</label>
                  <input
                    value={input.title}
                    onChange={getInput}
                    type="text"
                    name="title"
                    placeholder="Add a Catchy Title"
                    className="px-2 py-2 border-[1px] border-[#D83449] w-full rounded-md bg-[#ececec] focus:outline-none focus:border-[#942433]"
                  />
                </div>
                <div className="w-full mb-5">
                  <label className="text-[1.5rem] font-regular">
                    Description
                  </label>
                  <textarea
                    value={input.desc}
                    onChange={getInput}
                    name="desc"
                    type="text"
                    placeholder="Add what it describes"
                    className="px-2 py-1 border-[1px] border-[#D83449] h-[5rem] w-full rounded-md bg-[#ececec] focus:outline-none focus:border-[#942433]"
                  />
                </div>
                <div className="w-full mb-5">
                  <label className="text-[1.5rem] font-regular">
                    Tags{" "}
                    <span className="text-[1rem] text-[#3d3d3d]">
                      (Maximum 5Tags.){" "}
                    </span>
                  </label>
                  <div className="flex items-center">
                    <input
                      value={input.tags}
                      onChange={getInput}
                      disabled={input.tagdata.length >= 5}
                      type="text"
                      name="tags"
                      placeholder="This gives reach"
                      className={
                        input.tagdata.length >= 5
                          ? "px-2 py-2 border-[1px] border-[#D83449] w-full rounded-md cursor-not-allowed "
                          : "px-2 py-2 border-[1px] border-[#D83449] w-full rounded-md bg-[#ececec] focus:outline-none focus:border-[#942433]"
                      }
                    />
                    <div className="bg-[#D83449] text-white px-2 py-2 ml-2 rounded-md flex items-center justify-center">
                      <Send onClick={handleInputKeyPress} />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  {input.tagdata?.length > 0 ? (
                    <span className="text-[.9rem] text-[#1E1E1E] mr-2 mb-4 sm:mb-0">
                      Tags{" "}
                    </span>
                  ) : null}
                  {input.tagdata?.length > 0 &&
                    input.tagdata.map((tag, index) => {
                      return (
                        <span
                          className="text-[.7rem] text-white bg-[#1E1E1E] p-2 relative rounded-lg mr-5"
                          key={index}
                        >
                          #{tag}
                          <Close
                            className="relative left-1 cursor-pointer"
                            onClick={() => removeTag(tag)}
                          />
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ArtBoard;
