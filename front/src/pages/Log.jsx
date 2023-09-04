import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../components/Logo"

function Log() {
  return (
    <div className='w-full h-[88vh] sm:h-[88.4vh] flex justify-center items-center bg-[#e9493e]'>
      <div className="w-full grid">
      <h1 className='text-center text-[2.5rem] sm:text-[3rem] font-semibold leading-[5rem] sm:leading-[6rem] text-white'>Welcome to <br/><span className='text-[#1E1E1E] text-[6rem] sm:text-[9rem]'>Feedit</span></h1> 
      <p className='w-full text-center text-[1.5rem] text-white sm:text-[#8a2821]'>Place to create</p>
      <div className="w-fl flex justify-center items-center mt-[1rem]">
      <Link to={"/login"} className='text-[1.6rem] font-regular sm:text-[1.7rem] sm:font-semibold text-center mt-3 p-3 w-[70%] sm:w-[50%] rounded-xl text-[#D84339] bg-[#FFF]'>LogIn</Link>
      </div>
      </div>
    </div>
  )
}

export default Log
