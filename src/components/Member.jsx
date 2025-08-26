import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";

function Member({ data }) {
  const { id, userImage, name, email, phone, lastVisited, department, year, fineDue } = data;

  return (
    <ul className="w-full h-[4.7rem] grid grid-cols-25 text-sm/6 p-2 gap-1 bg-stone-100" key={id}>
      <li className="flex items-center text-stone-950">
        <input className="w-4 h-4" type="checkbox" name="select-all-member" id="select-all-member" />
      </li>
      <li className="col-span-5 flex items-center gap-3">
        <img className="w-11 h-11 rounded-full" src={userImage} alt="" />
        <div className="flex flex-col">
          <span className="text-stone-950 font-semibold">{name}</span>
          <span className="text-stone-500 text-sm truncate">{email}</span>
        </div>
      </li>
      <li className="col-span-2 flex items-center text-stone-950">ID {id}</li>
      <li className="col-span-3 flex items-center text-stone-950">{phone}</li>
      <li className="col-span-3 flex items-center text-stone-950">{lastVisited}</li>
      <li className="col-span-3 flex items-center text-stone-950">{department}</li>
      <li className="col-span-2 flex items-center text-stone-950">{year? year : "--"}</li>
      <li className="col-span-3 flex items-center text-stone-950">{fineDue}</li>
      <li className="col-span-3 flex items-center gap-2 text-stone-950">
        <button className="p-2 text-black bg-blue-200 rounded-sm"><TbEdit size={19} /></button>
        <button className="p-2 text-black bg-blue-200 rounded-sm"><MdDeleteOutline size={19} /></button>
      </li>
    </ul>
  )
}

export default Member