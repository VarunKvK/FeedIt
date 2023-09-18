import React, { useContext, useState } from "react";
import LoginImg from "../assets/Login.jpg";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { UserContext } from "../UserContextProvider";

function Login() {
  const [input, setInput] = useState({});
  const [reg, setReg] = useState(false);
  const [redirect,setRedirect]=useState(false)
  const { ready,user} = useContext(UserContext);

  function getInput(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((preValue) => {
      return { ...preValue, [name]: value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await axios
      .post("/login", {
        EMAIL: input.Email,
        PASSWORD: input.Password,
      })
      .then(() =>{ setReg(true)
          window.location.href="/home"
  
    });
  }

  return (
    <div className="absolute grid grid-cols-1 justify-center h-[87vh] sm:h-[88.2vh] 2xl:h-[90vh] w-full overflow-hidden md:grid-cols-2">
      <img
        src={LoginImg}
        alt="Login"
        className="object-cover h-auto hidden md:flex md:max-w-lg md:max-h-lg lg:max-h-lg lg:max-w-2xl 2xl:max-h-max 2xl:max-w-max"
      />
      <div className="flex justify-center items-center w-full sm:h-[70%]">
        {reg ? <div className="absolute animate-[move_.5s_ease-in-out] top-10 px-[10rem] py-3 border-[1px] border-green-500 bg-green-200 text-green-700">
          <CheckCircleIcon /> Logged In
        </div>:null}
        <div className="w-full grid place-items-center">
          <h1 className="text-[2rem] md:text-[3rem]">Login</h1>
          <form
            action="post"
            onSubmit={handleSubmit}
            className="w-full grid grid-3 place-items-center"
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
              <p className="text-[1.5rem] pb-1">Password</p>
              <input
                onChange={getInput}
                name="Password"
                value={input.Password}
                type="password"
                placeholder="Password"
                className="h-[2.5rem] w-[100%] pl-2 border-[1px] border-black bg-gray-100 focus:outline-none"
              />
            </div>
            <button className="mb-3 h-[2.8rem] w-[70%] text-center text-white bg-[#D83449]">
              Get In
            </button>
          </form>
          <div className="">
            <p className="text-[1rem] sm:text-[1.5rem]">
              Need an account?
              <Link to={"/register"} className="text-[#D84339]">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
