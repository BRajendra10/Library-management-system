import React, { useState } from 'react'

import Navigation from '../routes/Navigation';
import { resetLogin } from '../features/LoginSlice';

import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { AiOutlineMenu } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiCloseLargeFill } from "react-icons/ri";
import { CiGrid42 } from "react-icons/ci";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { BsBookHalf, BsPeople } from "react-icons/bs";
import { TbArrowsExchange } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";


function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { login, isLogedIn } = useSelector((state) => state.login);

    const handleLogout = () => {
        dispatch(resetLogin());
        navigate("/login");
    };

    return (
        <div className="w-full h-screen grid grid-cols-30 bg-white">

            {/* Sidebar for desktop */}
            <div className="2xl:col-span-4 hidden 2xl:flex flex-col gap-3 bg-blue-950 text-white">
                <div className="col-span-6 xl:col-span-5 2xl:col-span-4  hidden lg:flex flex-col gap-3">

                    <div className="w-full h-[4.5rem] flex items-center gap-4 px-4 py-3">
                        <span className="text-2xl"><span className="text-4xl text-green-400">S</span>toryScape</span>
                    </div>

                    <nav className="flex flex-col justify-center gap-1 p-3">
                        <NavLink
                            className={({ isActive }) => `text-white text-base flex items-center gap-3 rounded-lg p-2 px-3 ${isActive ? "bg-blue-500" : ""}`}
                            to={"/"}><CiGrid42 size={"18"} /> Overview</NavLink>
                        <NavLink
                            className={({ isActive }) => `text-white text-base flex items-center gap-3 rounded-lg p-2 px-3 ${isActive ? "bg-blue-500" : ""}`}
                            to={"/members"}><BsPeople size={"18"} />Members</NavLink>
                        <NavLink
                            className={({ isActive }) => `text-white text-base flex items-center gap-3 rounded-lg p-2 px-3 ${isActive ? "bg-blue-500" : ""}`}
                            to={"/books"}><BsBookHalf size={"18"} />Books</NavLink>
                        <NavLink
                            className={({ isActive }) => `text-white text-base flex items-center gap-3 rounded-lg p-2 px-3 ${isActive ? "bg-blue-500" : ""}`}
                            to={"/lend"}><TbArrowsExchange size={"18"} />Lend & Return</NavLink>
                        <NavLink
                            className={({ isActive }) => `text-white text-base flex items-center gap-3 rounded-lg p-2 px-3 ${isActive ? "bg-blue-500" : ""}`}
                            to={"/settings"}><IoSettingsOutline size={"18"} />Settings</NavLink>
                        {isLogedIn ?
                            <button className="text-white text-left text-base flex items-center gap-3 rounded-lg p-2 px-3" onClick={handleLogout}><LuLogOut size={"18"} />Logout</button> :
                            <NavLink
                                className={({ isActive }) => `text-white text-base flex items-center gap-3 rounded-lg p-2 px-3 ${isActive ? "bg-blue-500" : ""}`}
                                to={"/login"}><LuLogIn size={"18"} />Login</NavLink>}
                    </nav>
                </div>
            </div>

            <div className={`fixed inset-y-0 left-0 w-70 bg-blue-950 text-white shadow-lg z-50 transform transition-transform duration-300 2xl:hidden
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>

                <div className="w-full h-[4.5rem] flex justify-between items-center gap-4 px-4 py-3">
                    <span className="text-2xl"><span className="text-4xl text-green-400">S</span>toryScape</span>

                    <button onClick={() => setSidebarOpen(false)}>
                        <RiCloseLargeFill className="text-xl font-bold" />
                    </button>
                </div>

                <nav className="flex flex-col justify-center gap-1 p-3">
                    <NavLink
                        className={({ isActive }) => `text-white text-base flex items-center gap-3 rounded-lg p-2 px-3 ${isActive ? "bg-blue-500" : ""}`}
                        to={"/"}><CiGrid42 size={"18"} /> Overview</NavLink>
                    <NavLink
                        className={({ isActive }) => `text-white text-base flex items-center gap-3 rounded-lg p-2 px-3 ${isActive ? "bg-blue-500" : ""}`}
                        to={"/members"}><BsPeople size={"18"} />Members</NavLink>
                    <NavLink
                        className={({ isActive }) => `text-white text-base flex items-center gap-3 rounded-lg p-2 px-3 ${isActive ? "bg-blue-500" : ""}`}
                        to={"/books"}><BsBookHalf size={"18"} />Books</NavLink>
                    <NavLink
                        className={({ isActive }) => `text-white text-base flex items-center gap-3 rounded-lg p-2 px-3 ${isActive ? "bg-blue-500" : ""}`}
                        to={"/lend"}><TbArrowsExchange size={"18"} />Lend & Return</NavLink>
                    <NavLink
                            className={({ isActive }) => `text-white text-base flex items-center gap-3 rounded-lg p-2 px-3 ${isActive ? "bg-blue-500" : ""}`}
                            to={"/settings"}><IoSettingsOutline size={"18"} />Settings</NavLink>
                    {isLogedIn ?
                        <button className="text-white text-left text-base flex items-center gap-3 rounded-lg p-2 px-3" onClick={handleLogout}><LuLogOut size={"18"} />Logout</button> :
                        <NavLink
                            className={({ isActive }) => `text-white text-base flex items-center gap-3 rounded-lg p-2 px-3 ${isActive ? "bg-blue-500" : ""}`}
                            to={"/login"}><LuLogIn size={"18"} />Login</NavLink>}
                </nav>
            </div>

            {/* Right side content */}
            <div className="col-span-30 2xl:col-span-26 min-h-screen flex flex-col bg-white">

                {/* Top Bar */}
                <div className="w-full h-[4rem] flex justify-between items-center p-2 px-4 shadow-lg z-5">
                    <button className="2xl:hidden p-2 text-gray-700 hover:text-black focus:text-black duration-700" onClick={() => setSidebarOpen(true)}>
                        <AiOutlineMenu className="text-xl" />
                    </button>

                    {/* Right Side (Notifications + User) */}
                    <div className="flex items-center gap-3 ml-auto" onClick={() => navigate("/about")}>
                        <button className="relative p-2 text-stone-500 hover:text-stone-950 duration-700">
                            <IoMdNotificationsOutline className="text-xl" />

                            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full absolute top-2 right-2"></span>
                        </button>
                        <img
                            className="w-10 h-10 object-cover rounded-full"
                            src={isLogedIn && login.profileImage}
                            alt="curr-user"
                        />
                    </div>
                </div>

                {/* Page Content */}
                <Navigation />
            </div>
        </div>
    )
}

export default Dashboard