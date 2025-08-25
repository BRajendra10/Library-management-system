import React from 'react'
import { LuSearch } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Member from '../components/Member';
import { useSelector } from 'react-redux'

function Members() {
  const { members } = useSelector((state) => state.members);

  return (
    <div className="w-full h-220 flex flex-col items-center border border-blue-200 bg-blue-100/40 rounded-lg">
      <div className="w-full h-[3.8rem] grid grid-cols-20">
        <nav className="col-span-5 2xl:col-span-3 grid grid-cols-2">
          <NavLink className="flex justify-center hover:bg-blue-200 items-center">Students</NavLink>
          <NavLink className="flex justify-center hover:bg-blue-200 items-center">Admin</NavLink>
        </nav>

        <button className="col-end-21 col-span-2 uppercase text-blue-700 hover:bg-blue-300/50 bg-blue-300"> + add member </button>
      </div>
      <div className="w-full h-full bg-white rounded-lg">
        {/* <div className="w-full h-[3.8rem] grid grid-cols-20">
          <div className="col-span-5 grid grid-cols-12 p-2 py-3">
            <div className="col-span-1 flex justify-center items-center rounded-l-lg bg-gray-200">
              <LuSearch className="text-xl" />
            </div>
            <input className="col-span-11 border-1 border-black rounded-lg outline-none p-2" type="text" name="" id="" />
          </div>

          <div className="col-end-21 col-span-2 bg-red-400"></div>
        </div> */}
        {/* <div className="w-full h-[20rem]">
          {members.map((el) => <Member data={el} /> )}
        </div> */}
      </div>
    </div>
  )
}

export default Members