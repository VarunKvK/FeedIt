import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContextProvider";
import axios from "axios";
import Loader from "../components/Loader";
import HomeArtContainer from "../components/HomeArtContainer";


function shuffleArray(array) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Home() {
  const { ready, user } = useContext(UserContext);
  const [userInfo, getUserInput] = useState();
  const [art, setArt] = useState([]);
  useEffect(() => {
    axios.get("/createprofile").then((res) => {
      getUserInput(res.data[0]);
      console.log(res)
    });
  }, [user]);

  useEffect(() => {
    axios.get("/home").then((res) => {
      const randomArt = shuffleArray(res.data);
      setArt(randomArt);
      console.log(res)
    });
  }, []);
  // if (!ready) {
  //   return (
  //     <div className="mt-12">
  //       <Loader />
  //     </div>
  //   );
  // }
  return (
    <div>
      <div className="mt-5">
        <h1 className="w-full text-center text-[#1E1E1E]">
          Hello{" "}
          {userInfo?.username ? (
            <span className="text-[#D84339] font-semibold capitalize">
              {userInfo?.username}
            </span>
          ) : (
            <span className="text-[#D84339] font-semibold capitalize">
              {user?.username}
            </span>
          )}
        </h1>
      </div>
      <div className="flex w-full justify-center mt-6 lg:mt-1 md:mt-4 sm:p-4 ">
        <div className="w-full h-[100vh] md:h-screen grid gap-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 place-items-center p-10">
          {art?.length > 0 &&
            art?.map((art,index) => {
              return(<HomeArtContainer key={index} input={art}/>)
            })}
        </div>
      </div>
      
    </div>
  );
}

export default Home;
