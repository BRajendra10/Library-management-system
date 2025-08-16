import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { IoOptionsSharp } from "react-icons/io5";
import { RiLayoutMasonryFill } from "react-icons/ri";
import { BiSolidBookAlt } from "react-icons/bi";
import { HiUsers } from "react-icons/hi2";
import { AiFillSetting } from "react-icons/ai";
import { PiWarningCircleBold } from "react-icons/pi";

import user from "../assets/user-1.jpg";
import { NavLink } from "react-router-dom";
import Navigation from '../routes/Navigation';


function Dashboard() {
    return (
        <div className="w-full h-screen grid grid-cols-30 xl:grid-cols-22 bg-stone-200">

            {/* left sidebar after 1280px(xl) for large screens */}
            <div className="col-span-4 2xl:col-span-3 hidden xl:flex flex-col gap-3 bg-stone-50">

                {/* Logo */}
                <div className="w-full h-[4rem] px-4 py-3">
                    <div className="h-full flex justify-start gap-3 items-center">
                        <svg className="w-[3rem] h-full object-contain text-blue-500" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300.000000 300.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                                <path d="M445 2642 c-38 -6 -64 -25 -80 -57 -13 -29 -15 -134 -15 -849 0 -891 -1 -870 57 -899 17 -9 75 -17 148 -20 320 -16 593 -115 796 -289 31 -26 60 -48 63 -48 4 0 5 384 4 853 l-3 854 -30 43 c-133 194 -354 331 -620 384 -80 16 -283 34 -320 28z" />
                                <path d="M2425 2638 c-364 -25 -642 -165 -810 -408 l-30 -43 -3 -854 c-1 -469 0 -853 4 -853 3 0 32 22 63 48 203 174 476 273 796 289 73 3 131 11 148 20 58 29 57 8 57 899 0 715 -2 820 -15 849 -27 56 -57 63 -210 53z" />
                                <path d="M54 2259 c-11 -6 -28 -23 -37 -39 -16 -26 -17 -104 -17 -905 0 -762 2 -880 15 -905 29 -56 74 -62 227 -31 258 53 616 67 853 32 72 -11 139 -22 150 -26 34 -11 -44 52 -129 105 -148 92 -339 145 -578 160 -198 13 -274 53 -330 175 l-23 50 -3 698 -3 697 -52 -1 c-29 0 -61 -5 -73 -10z" />
                                <path d="M2818 1573 l-3 -698 -23 -50 c-56 -122 -132 -162 -330 -175 -239 -15 -430 -68 -578 -160 -85 -53 -163 -116 -129 -105 11 4 79 15 150 26 237 35 595 21 853 -32 153 -31 198 -25 227 31 13 25 15 143 15 905 0 800 -1 879 -17 905 -21 36 -52 50 -113 50 l-49 0 -3 -697z" />
                            </g>
                        </svg>
                        <span className="text-2xl">Libra</span>
                    </div>

                </div>

                <div className="w-full flex justify-center items-center px-4 py-2">
                    <button className="w-full p-2 rounded-lg uppercase text-white bg-blue-500 hover:bg-blue-400">Lend / return</button>
                </div>

                <nav className="py-2 pr-3 flex flex-col justify-between gap-0">
                    <NavLink
                        className={({ isActive }) => `text-stone-600 hover:bg-blue-200 hover:text-stone-950 rounded-r-3xl px-4 py-2 ${isActive ? "text-stone-950" : ""}`}
                        to={"/"}>Overview</NavLink>
                    <NavLink
                        className={({ isActive }) => `text-stone-600 hover:bg-blue-200 hover:text-stone-950 rounded-r-3xl px-4 py-2 ${isActive ? "text-stone-950" : ""}`}
                        to={"/books"}>Books</NavLink>
                    <NavLink
                        className={({ isActive }) => `text-stone-600 hover:bg-blue-200 hover:text-stone-950 rounded-r-3xl px-4 py-2 ${isActive ? "text-stone-950" : ""}`}
                        to={"/members"}>Members</NavLink>
                </nav>

                {/* Navigation */}
                <nav className="py-2 pr-3 flex flex-col justify-between gap-0">
                    <NavLink
                        className={({ isActive }) => `text-stone-600 hover:bg-blue-200 hover:text-stone-950 rounded-r-3xl px-4 py-2 ${isActive ? "text-stone-950" : ""}`}
                        to={"/settings"}>Settings</NavLink>
                    <NavLink
                        className={({ isActive }) => `text-stone-600 hover:bg-blue-200 hover:text-stone-950 rounded-r-3xl px-4 py-2 ${isActive ? "text-stone-950" : ""}`}
                        to={"/about"}>About</NavLink>
                    <NavLink
                        className={({ isActive }) => `text-stone-600 hover:bg-blue-200 hover:text-stone-950 rounded-r-3xl px-4 py-2 ${isActive ? "text-stone-950" : ""}`}
                        to={"/help-support"}>Help & Support</NavLink>
                </nav>
            </div>

            {/* left sidebar before 1280px(xl) for small screens */}
            <div className="col-span-4 sm:col-span-3 lg:col-span-2 xl:hidden bg-sky-950">
                <div className="w-full h-[4rem] flex justify-center items-center">
                    <AiOutlineMenu className="text-xl font-bold text-blue-500" />
                </div>

                <nav className="w-full flex flex-col gap-0 my-5">
                    <NavLink className={({ isActive }) => `flex justify-center items-center text-xl p-2 ${isActive ? "text-blue-600" : "text-blue-800"}`} to={"/"}>
                        <RiLayoutMasonryFill />
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex justify-center items-center text-xl p-2 ${isActive ? "text-blue-600" : "text-blue-800"}`} to={"/books"}>
                        <BiSolidBookAlt />
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex justify-center items-center text-xl p-2 ${isActive ? "text-blue-600" : "text-blue-800"}`} to={"/members"}>
                        <HiUsers />
                    </NavLink>
                </nav>

                <nav className="w-full flex flex-col gap-0 my-5">
                    <NavLink className={({ isActive }) => `flex justify-center items-center text-xl p-2 ${isActive ? "text-blue-600" : "text-blue-800"}`} to={"/settings"}>
                        <AiFillSetting />
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex justify-center items-center text-xl p-2 ${isActive ? "text-blue-600" : "text-blue-800"}`} to={"/about"}>
                        <PiWarningCircleBold />
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex justify-center items-center text-xl p-2 ${isActive ? "text-blue-600" : "text-blue-800"}`} to={"/help-support"}>
                        <HiUsers />
                    </NavLink>
                </nav>

            </div>

            {/* Right side of dashboard */}
            <div className="col-span-26 sm:col-span-27 lg:col-span-28 xl:col-span-18 2xl:col-span-19 flex flex-col bg-stone-50">

                {/* right top navigation */}
                <div className="w-full h-[4rem] flex justify-end sm:justify-between items-center p-2">

                    <div className="w-fit md:w-[30rem] lg:w-[40rem] h-fit hidden sm:grid grid-cols-15 border border-stone-400 bg-white p-1 rounded-sm">
                        <button className="col-span-1 flex justify-center items-center p-1">
                            <IoSearch className="text-xl font-normal" />
                        </button>

                        <input className="block col-span-13 border-none outline-none py-1 px-2" type="text" />

                        <button className="col-span-1 flex justify-center items-center p-1">
                            <IoOptionsSharp className="text-xl font-normal" />
                        </button>
                    </div>

                    <div className="w-[10rem] sm:w-[7rem] flex justify-evenly items-center gap-4">
                        <button className="col-span-1 flex sm:hidden justify-center items-center p-2 text-stone-500 hover:text-stone-950 duration-300">
                            <IoSearch className="text-xl font-normal" />
                        </button>

                        <button className="p-2 text-2xl text-stone-500 hover:text-stone-950 rounded-full duration-300"><IoMdNotificationsOutline /></button>

                        <div className="w-12 h-12 rounded-full border-2 border-blue-400 p-1">
                            <img className="w-full h-full object-cover rounded-full" src={user} alt="curr-user" />
                        </div>
                    </div>
                </div>

                {/* All pages */}
                <Navigation />
            </div>
        </div>
    )
}

export default Dashboard