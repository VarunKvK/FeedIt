import React, { useContext } from 'react'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'
// import { UserContext } from './UserContextProvider'
// const {user}=useContext(UserContext)

function Layout() {


  return (
    <div>
      <NavBar/>
      <Outlet/>
    </div>
  )
}

export default Layout
