import React from 'react'
import { Link } from 'react-router-dom'
import { Add } from "@mui/icons-material";

function CreateNew({id}) {
  return (
<div className="w-full flex justify-center items-center mt-12">
        <Link
          to={"/profile/"+id+"/newArtBoard"}
          className="p-3 bg-[#1E1E1E] text-white hover:bg-[#D83449] transition ease duration-75 shadow-md rounded-full"
        >
          <Add />
        </Link>
      </div>
  )
}

export default CreateNew
