import React, { useEffect, useState } from "react";
import ArtPost from "../components/ArtPost";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import MasonryLayout from "../components/MasonryLayout";

function shuffleArray(array) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Art() {
  const [art, getart] = useState([]);
  const [filteredArt, setRelatedArt] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios.get("/artpost/" + id).then((res) => {
      getart(res.data);
    });
    axios.get("/home").then((res) => {
      const filtered = res.data.filter((post) => post._id !== id);
      const randomArt = shuffleArray(filtered);
      setRelatedArt(randomArt);
    });
  }, []);

  return (
    <div className="w-full grid place-items-center p-10">
      <div className="">
        <Link
          to={"/home"}
          className="h-[3rem] w-[3rem] rounded-full shadow-md p-2 flex justify-center items-center bg-[#D83449] text-white hover:bg-[#FFF] hover:text-[#D83449] transition ease-in-out duration-1"
        >
          <ArrowBack className="" />
        </Link>
        <ArtPost Art={art} className="mt-[5rem]" />
      </div>
      <div className="">
        <h1 className="text-gray-400 font-medium mt-10 mb-4">
          More Art like this
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredArt.map((data, index) => {
            return (
              <a
                href={`/home/art/${data?.title}/${data?._id}`}
                onClick={() => window.location.reload()}
                key={index}
              >
                <MasonryLayout Data={data} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Art;
