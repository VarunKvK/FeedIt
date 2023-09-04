import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const UserContext =createContext({});

function UserContextProvider({children}) {
    const [user,setUser]=useState(null);
    const[ready,setReady]=useState(false);
    useEffect(()=>{
        const Data=async ()=>{
            try{
                if(!user){
                    await axios.get("/profile").then((response)=>{
                        setUser(response?.data)
                        setReady(true)
                    })
                }
            }catch(err){console.log(err)}
        }
        Data()
    },[])
  return (
    <UserContext.Provider value={{user,setUser,ready}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
