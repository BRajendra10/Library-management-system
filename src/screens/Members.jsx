import React from 'react'
import { LuSearch } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Member from '../components/Member';
import { useSelector } from 'react-redux'
import SearchBar from '../components/SearchMember';
import { useNavigate, Outlet } from 'react-router-dom';
import MembersRoute from '../routes/MembersRoutes';

function Members() {
  const navigate = useNavigate();
  const { members, admin } = useSelector((state) => state.members);

  
  return (
    <div className="w-full h-full px-2">
      <div className="w-full h-220 flex flex-col items-center border border-blue-200 bg-blue-100/40 rounded-lg">
        <div className="w-full min-h-[3.7rem] flex flex-col sm:flex-row justify-between items-center">
          <nav className="w-full sm:w-[25rem] h-[4rem] sm:h-full grid grid-cols-3 gap-2">
            <NavLink className={({ isActive }) => `flex justify-center gap-2 items-center ${isActive ? "border-b-2 border-b-blue-500 text-stone-950" : ""}`} to={""}>
              All <span className="bg-blue-500 text-sm text-white rounded-xl px-2">{members.length}</span>
            </NavLink>
            <NavLink className={({ isActive }) => `flex justify-center gap-2 items-center ${isActive ? "border-b-2 border-b-blue-500 text-stone-950" : ""}`} to={"students"}>
              Students <span className="bg-blue-500 text-sm text-white rounded-xl px-2">{members.length - admin.length}</span>
            </NavLink>
            <NavLink className={({ isActive }) => `flex justify-center gap-2 items-center ${isActive ? "border-b-2 border-b-blue-500 text-stone-950" : ""}`} to={"admin"}>
              Admin <span className="bg-blue-500 text-sm text-white rounded-xl px-2">{admin.length}</span>
            </NavLink>
          </nav>

          <button className="w-full sm:w-[10rem] h-[3.5rem] sm:h-full uppercase text-blue-700 hover:bg-blue-300/50 bg-blue-300" onClick={() => navigate('/register')}> + add member </button>
        </div>
        <div className="w-full h-[4.5rem] flex justify-between items-center bg-white p-2">
          <SearchBar />
        </div>
        <div className="relative w-full h-full bg-white rounded-lg overflow-scroll">
          <ul className="hidden  sticky top-0 left-0 w-full h-[3rem] md:grid grid-cols-25 text-sm/6 p-2 gap-1 bg-white z-5">
            <li className="flex items-center text-stone-500">
              <input className="w-4 h-4" type="checkbox" name="select-all-member" id="select-all-member" />
            </li>
            <li className="col-span-5 flex items-center text-stone-500">Name & Email</li>
            <li className="col-span-2 flex items-center text-stone-500">Member ID</li>
            <li className="col-span-3 flex items-center text-stone-500">Phone number</li>
            <li className="col-span-3 flex items-center text-stone-500">Last visited</li>
            <li className="col-span-3 flex items-center text-stone-500">Department</li>
            <li className="col-span-2 flex items-center text-stone-500">Year</li>
            <li className="col-span-3 flex items-center text-stone-500">Fine Due</li>
            <li className="col-span-3 flex items-center text-stone-500">Actions</li>
          </ul>
          <div className="absolute top-0 md:top-10 left-0 w-full h-fit flex flex-col gap-1 overflow-scroll z-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Members