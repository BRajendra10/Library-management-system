import React from 'react'
import { useNavigate } from "react-router";

function Book({ data, index }) {
  const navigate = useNavigate();

  return (
    <div className="w-60 bg-white flex-shrink-0 flex flex-col gap-3 rounded-xl shadow-xl p-2" key={index} onClick={() => navigate("/description", {state: {bookData: data}})}>
      <div className="w-full h-65 rounded-xl">
        <img className="w-full h-full rounded-t-xl object-fit-contain" src={data.coverImage} alt="" />
      </div>

      <div className="w-full flex flex-col">
        <h3 className="text-sm font-bold truncate m-0">Title: {data.title}</h3>
        <span className="text-sm font-semibold">Author: {data.author}</span>
      </div>
    </div>
  )
}

export default Book