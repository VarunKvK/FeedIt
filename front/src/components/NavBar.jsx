import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams, useNavigate  } from "react-router-dom";
import Logo from "./Logo";
import {
  CloseRounded,
  Diversity2Rounded,
  Person,
  Search,
} from "@mui/icons-material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { UserContext } from "../UserContextProvider";
import ResponsiveNav from "./ResponsiveNav";
import SearchPage from "../pages/Search";
import axios from "axios";
import { useGlobalState } from "../Search";

function NavBar() {
  let { currentPage } = useParams();
  const [open, setclose] = useState(false);
  const [openmenu, setmenuclose] = useState(false);
  const { ready, user } = useContext(UserContext);
  const [activeLink, setActiveLink] = useState(null);
  const [userInput, getUserInput] = useState();
  const navigate = useNavigate();

  const {inputValue,setInputValue}=useGlobalState()
  const [searchValue,setSearchValue]=useState("")

  if (currentPage === undefined) {
    currentPage = "home";
  }
  useEffect(() => {
    axios.get("/createprofile").then((res) => {
      getUserInput(res.data[0]);
    });
  }, [user]);

  function logout() {
    axios.post("/logout").then(() => {
      window.location = "/";
    });
  }

  const handleKeyDown = (e) => {
    if(e.key==="Enter"){
      setInputValue(searchValue);
      navigate(`/search?query=${searchValue}`)
    }
  };
    const handleInputChange = (e) => {
      e.preventDefault()
    setSearchValue(e.target.value);
    setInputValue(" ")
  };

  return (
    <div className="flex gap-12 justify-center items-center h-[5rem] shadow-lg transition ease-in-out duration-[.5s]">
      {user ? (
        <>
          <Link to={"/home"} className="">
            <Logo />
          </Link>
          <div className="hidden gap-12 items-center md:flex">
            <Link to={"/home"} className="text-[#1f1f1f]">
              Home
            </Link>
            {userInput?._id ? (
              <Link
                to={"/profile/" + userInput?._id + "/newArtBoard"}
                className="text-[#1f1f1f]"
              >
                Create
              </Link>
            ) : (
              <Link to={"/profile/editprofile"} className="text-[#1f1f1f]">
                Create
              </Link>
            )}
          </div>
          <div className="w-[40%] border-[1px] border-[#D84339] relative left-[2rem] flex items-center  rounded-2xl md:w-[30%]">
            <Search className="transform -translate-y-1/2 text-gray-500 absolute top-1/2 left-3" />
            <input
              value={searchValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Search..."
              className=" w-[95%] h-full p-2 px-10 border-none rounded-2xl focus:outline-none md:w-[95%]"
            />
          </div>
          <div className="relative left-[3rem] justify-center gap-1 items-center hidden md:flex">
            <div className="bg-[#D84339] h-[3rem] w-[3rem] rounded-full flex justify-center items-center">
              {userInput?.profilephotos ? (
                <img
                  className="object-cover h-[3rem] w-[3rem] rounded-full flex justify-center items-center"
                  src={
                    "https://feeditapp.onrender.com/uploads/profile/" +
                    userInput.profilephotos
                  }
                />
              ) : (
                <Person className="text-white" />
              )}
            </div>
            {userInput?.username ? (
              <p className="text-[#1E1E1E] capitalize">{userInput?.username}</p>
            ) : (
              <p className="text-[#1E1E1E] capitalize">{user?.username}</p>
            )}
            <ArrowDropDownCircleIcon
              onClick={() => {
                setmenuclose(true);
                setclose(false);
              }}
              className="text-[#1E1E1E] cursor-pointer"
            />
            {openmenu ? (
              <div className="z-50 animate-[topDown_.2s_ease-in-out] grid grid-rows-3 gap-2 absolute top-[5.4rem] right-15 bg-white shadow-md rounded-lg px-[2rem] py-[.5rem]">
                <Link
                  className="w-full text-center"
                  to={
                    userInput?._id ? "/profile/" + userInput?._id : "/profile"
                  }
                  onClick={() => setmenuclose(false)}
                >
                  Profile
                </Link>
                <Link
                  className="w-full text-center"
                  to={"/faq"}
                  onClick={() => setmenuclose(false)}
                >
                  Faq
                </Link>
                <button onClick={logout}>Logout</button>
                <div className="w-full text-center">
                  <CloseRounded
                    className="text-center bg-[#D84339] p-1 rounded-full relative top-1 mb-2 text-white w-full cursor-pointer shadow-sm"
                    onClick={() => setmenuclose(false)}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <Link to={"/login"} className="w-full flex justify-center">
          <Logo />
        </Link>
      )}
      <ResponsiveNav
        Logout={logout}
        setclose={setclose}
        open={open}
        setmenuclose={setmenuclose}
      />
      {/* <Link to={`/home/art/${searchResults?.title}/${searchResults._id}`}></Link> */}
    </div>
  );
}

export default NavBar;
