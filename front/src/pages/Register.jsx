import React, { useState } from "react";
import SignUp from "../assets/SignUp.jpg";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";


function Register() {
  const [input, setInput] = useState({});
  const [reg, setReg] = useState(false);
  const [redirect,setRedirect]=useState(false)
  function getInput(event) {
    event.preventDefault();

    const { name, value } = event.target;
    setInput((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await axios.post("/register", {
      EMAIL: input.Email,
      USERNAME: input.Username,
      PASSWORD: input.Password,
    })
      setReg(true)
      setRedirect(true)
  }

  if(redirect){
    return (<Navigate to={"/login"}/>)
  }

  return (
    <div className="absolute grid grid-cols-1 justify-center h-[87vh] sm:h-[88.2vh] 2xl:h-[92vh] w-full overflow-hidden md:grid-cols-2">
      <div className="flex justify-center items-center w-full sm:h-[100%]">
      {reg ? <div className="absolute animate-[move_.5s_ease-in-out] top-10 px-[10rem] py-3 border-[1px] border-green-500 bg-green-200 text-green-700">
          <CheckCircleIcon /> Signed In
        </div>:null}
        <div className="w-full grid place-items-center">
          <h1 className="text-[2rem] md:text-[3rem]">Sign Up</h1>
          <form
            onSubmit={handleSubmit}
            action="post"
            className="w-full grid grid-4 place-items-center"
          >
            <div className="pb-4 w-[70%]">
              <p className="text-[1.5rem] pb-1">Email</p>
              <input
                onChange={getInput}
                name="Email"
                value={input.Email}
                type="email"
                placeholder="Email"
                className="h-[2.5rem] w-[100%] pl-2 border-[1px] bg-gray-100 border-black focus:outline-none"
              />
            </div>
            <div className="pb-4 w-[70%]">
              <p className="text-[1.5rem] pb-1">Username</p>
              <input
                onChange={getInput}
                name="Username"
                value={input.Username}
                type="text"
                placeholder="Username"
                className="h-[2.5rem] w-[100%] pl-2 border-[1px] bg-gray-100 border-black focus:outline-none"
              />
            </div>
            <div className="pb-4 w-[70%]">
              <p className="text-[1.5rem] pb-1">Password</p>
              <input
                onChange={getInput}
                name="Password"
                value={input.Password}
                type="password"
                placeholder="Password"
                className="h-[2.5rem] w-[100%] pl-2 border-[1px] bg-gray-100 border-black focus:outline-none"
              />
            </div>
            <button className="mb-3 h-[2.8rem] w-[70%] text-center text-white bg-[#D83449]">
              Hello User
            </button>
          </form>
          <div className="">
            <p className="text-[1rem] sm:text-[1.5rem]">
              Have an account?
              <Link to={"/login"} className="text-[#D84339]">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <img
        src={SignUp}
        alt="Login"
        className="object-cover h-auto hidden md:flex md:max-w-lg md:max-h-lg lg:max-h-lg lg:max-w-lg 2xl:max-h-4xl 2xl:max-w-4xl absolute right-0"
      />
    </div>
  );
}

export default Register;
