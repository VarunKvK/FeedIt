import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import { useLocation } from "react-router-dom";
import Masonry from 'react-masonry-css';

const breakPoints={
  default:3,
  1100:2,
  700:1

}

function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const inputValue = searchParams.get("query");

  const [searchResult, getSearchResult] = useState([]);
  useEffect(() => {
    if (inputValue) {
  
        const fetchData=async()=>{
          await axios.get(`/search?query=${inputValue}`).then((data)=>{
            getSearchResult(data.data);
          })
        }
        fetchData()
    }
  }, [inputValue]);
  
  return <div>
    <Masonry
  breakpointCols={breakPoints}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column">
    {searchResult.map((data,index)=>{
      return(
        <div className="h-[34rem] md:p-2">
        <Link to={`art/${data.title}/${data._id}`}>
        <div className="shadow-lg h-[30rem] w-[20rem] md:w-[15rem] rounded-2xl cursor-pointer">
          <img
            src={`https://feeditapp.onrender.com/uploads/art/${data.art}`}
            className="h-[30rem] object-cover absolute w-[20rem] md:w-[15rem] rounded-2xl"
            alt={data.title}
          />
          <div className="bg-[#1e1e1e41] opacity-[0%] hover:opacity-[100%] h-[30rem] relative w-[20rem] md:w-[15rem] rounded-2xl transition-opacity duration-100 ease-in">
            <h1 className="p-4 text-white">{data.title}</h1>
            <p className=" w-[90%] p-4 text-white absolute bottom-2 truncate">
              {data.desc}
            </p>
          </div>
          <div className="flex items-center mt-2">
            <div className="h-[2rem] w-[2rem] rounded-full shadow-lg">
              <img src={`https://feeditapp.onrender.com/uploads/profile/${data.owner.profilephotos}`} alt="" className="h-full object-cover rounded-full shadow-lg w-full" />
            </div>
            <div className="ml-2">
              <p>{data.owner.username}</p>
            </div>
          </div>
        </div>
            </Link>
      </div>
      )
    })}
    </Masonry>
  </div>;
}

export default Search;
