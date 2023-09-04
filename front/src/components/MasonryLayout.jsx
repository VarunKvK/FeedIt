import React from "react";

const MasonryLayout = ({ Data }) => {
  return (
    <div className="h-[25rem] relative w-[18rem] rounded-xl cursor-pointer mb-8">
      <img
        src={"http://localhost:8000/uploads/art/" + Data?.art}
        className="h-full object-cover absolute w-[18rem] rounded-xl"
      />
      <div className="bg-[#1e1e1e41] opacity-[0%] hover:opacity-[100%] h-[25rem] relative w-[18rem] rounded-xl transition-opacity duration-100 ease-in">
        <h1 className="p-4 text-white">{Data.title}</h1>
        <p className=" w-[90%] p-4 text-white absolute bottom-2 truncate">
          {Data.desc}
        </p>
      </div>
    </div>
  );
};

export default MasonryLayout;
