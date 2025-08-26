import React from 'react'
import { LuSearch } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Member from '../components/Member';
import { useSelector } from 'react-redux'

function Members() {
  const { members } = useSelector((state) => state.members);

  return (
    <div className="w-full h-full px-2">
      <div className="w-full h-220 flex flex-col items-center border border-blue-200 bg-blue-100/40 rounded-lg">
        <div className="w-full min-h-[3.5rem] grid grid-cols-20">
          <nav className="col-span-5 2xl:col-span-3 grid grid-cols-2">
            <NavLink className="flex justify-center hover:bg-blue-200 items-center">Students</NavLink>
            <NavLink className="flex justify-center hover:bg-blue-200 items-center">Admin</NavLink>
          </nav>

          <button className="col-end-21 col-span-2 uppercase text-blue-700 hover:bg-blue-300/50 bg-blue-300"> + add member </button>
        </div>
        <div className="w-full h-full bg-white rounded-lg overflow-scroll">
          <ul className="w-full h-[3rem] grid grid-cols-25 text-sm/6 p-2 gap-1 bg-white z-5">
            <li className="flex items-center text-stone-500">
              <input className="w-4 h-4" type="checkbox" name="select-all-member" id="select-all-member" />
            </li>
            <li className="col-span-5 flex items-center text-stone-500">Name & Email </li>
            <li className="col-span-2 flex items-center text-stone-500">Member ID</li>
            <li className="col-span-3 flex items-center text-stone-500">Phone number</li>
            <li className="col-span-3 flex items-center text-stone-500">Last visited</li>
            <li className="col-span-3 flex items-center text-stone-500">Department</li>
            <li className="col-span-2 flex items-center text-stone-500">Year</li>
            <li className="col-span-3 flex items-center text-stone-500">Fine Due</li>
            <li className="col-span-3 flex items-center text-stone-500">Actions</li>
          </ul>
          <div className="w-full h-full flex flex-col gap-1 overflow-scroll z-3">
            {members.map((el) => <Member data={el} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Members