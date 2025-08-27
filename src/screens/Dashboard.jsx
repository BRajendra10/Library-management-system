import React from 'react'
import { AiOutlineMenu, AiFillSetting } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSearch, IoOptionsSharp } from "react-icons/io5";
import { RiLayoutMasonryFill, RiCloseLargeFill } from "react-icons/ri";
import { BiSolidBookAlt } from "react-icons/bi";
import { HiUsers } from "react-icons/hi2";
import { PiWarningCircleBold } from "react-icons/pi";
import Navigation from '../routes/Navigation';
import user from "../assets/user-1.jpg";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { SidebarContext } from '../context/sidebarContext';
import { updateLoginData } from '../features/LoginSlice';
import { GrSearch } from "react-icons/gr";

function Dashboard() {
    const { admin, isLogedIn } = useSelector((state) => state.login);
    const dispatch = useDispatch();

    function HandleLogout() {
        dispatch(updateLoginData({
            id: 1,
            updatedData: {
                isLogedIn: false,
            }
        }))
    }

    return (
        <div className="w-full h-screen grid grid-cols-30 bg-stone-100">

            {/* sidebar modal */}
            {/* <div className={`w-[16rem] h-[100vh] absolute top-0 left-0 flex-col gap-3 bg-stone-50 duration-700 ${isOpen ? "flex" : "hidden"}`}>
                Logo
                <div className="w-full h-[4rem] flex justify-between items-center px-4 py-3">
                    <div className="h-full flex items-center gap-3">
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

                    <button className="p-2 text-xl" onClick={() => toggleSidebar()}><RiCloseLargeFill /></button>
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

                Navigation
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
            </div> */}

            {/* left sidebar after 1280px(xl) for large screens */}
            <div className="col-span-6 xl:col-span-5 2xl:col-span-4  hidden lg:flex flex-col gap-3 bg-white">

                {/* Logo */}
                <div className="w-full h-[4rem] flex jusitfy-between items-center gap-4 px-4 py-3">
                    <svg className="w-[3rem] h-full object-contain text-blue-500" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300.000000 300.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                            <path d="M445 2642 c-38 -6 -64 -25 -80 -57 -13 -29 -15 -134 -15 -849 0 -891 -1 -870 57 -899 17 -9 75 -17 148 -20 320 -16 593 -115 796 -289 31 -26 60 -48 63 -48 4 0 5 384 4 853 l-3 854 -30 43 c-133 194 -354 331 -620 384 -80 16 -283 34 -320 28z" />
                            <path d="M2425 2638 c-364 -25 -642 -165 -810 -408 l-30 -43 -3 -854 c-1 -469 0 -853 4 -853 3 0 32 22 63 48 203 174 476 273 796 289 73 3 131 11 148 20 58 29 57 8 57 899 0 715 -2 820 -15 849 -27 56 -57 63 -210 53z" />
                            <path d="M54 2259 c-11 -6 -28 -23 -37 -39 -16 -26 -17 -104 -17 -905 0 -762 2 -880 15 -905 29 -56 74 -62 227 -31 258 53 616 67 853 32 72 -11 139 -22 150 -26 34 -11 -44 52 -129 105 -148 92 -339 145 -578 160 -198 13 -274 53 -330 175 l-23 50 -3 698 -3 697 -52 -1 c-29 0 -61 -5 -73 -10z" />
                            <path d="M2818 1573 l-3 -698 -23 -50 c-56 -122 -132 -162 -330 -175 -239 -15 -430 -68 -578 -160 -85 -53 -163 -116 -129 -105 11 4 79 15 150 26 237 35 595 21 853 -32 153 -31 198 -25 227 31 13 25 15 143 15 905 0 800 -1 879 -17 905 -21 36 -52 50 -113 50 l-49 0 -3 -697z" />
                        </g>
                    </svg>
                    <span className="text-2xl">Library</span>
                </div>

                <div className="w-full flex justify-center items-center px-4 py-2">
                    <button className="w-full p-2 rounded-lg uppercase text-white bg-blue-500 hover:bg-blue-400">Lend / return</button>
                </div>

                <nav className="flex flex-col justify-center gap-1 p-3">
                    <NavLink
                        className={({ isActive }) => `text-stone-950 hover:bg-blue-500 hover:text-white duration-300 text-base rounded-lg p-2 px-3 ${isActive ? "bg-blue-500 text-white" : ""}`}
                        to={"/"}>Overview</NavLink>
                    <NavLink
                        className={({ isActive }) => `text-stone-950 hover:bg-blue-500 hover:text-white duration-300 text-base rounded-lg p-2 px-3 ${isActive ? "bg-blue-500 text-white" : ""}`}
                        to={"/books"}>Books</NavLink>
                    <NavLink
                        className={({ isActive }) => `text-stone-950 hover:bg-blue-500 hover:text-white duration-300 text-base rounded-lg p-2 px-3 ${isActive ? "bg-blue-500 text-white" : ""}`}
                        to={"/members"}>Members</NavLink>
                    <NavLink
                        className={({ isActive }) => `text-stone-950 hover:bg-blue-500 hover:text-white duration-300 text-base rounded-lg p-2 px-3 ${isActive ? "bg-blue-500 text-white" : ""}`}
                        to={"/about"}>About</NavLink>
                </nav>

                {/* Navigation */}
                <nav className="flex flex-col justify-center gap-1 p-3">
                    {isLogedIn ? <button className="text-stone-950 hover:bg-blue-500 text-left hover:text-white duration-300 text-base rounded-lg p-2 px-3" onClick={() => HandleLogout()}>Logout</button> :
                        <NavLink
                            className={({ isActive }) => `text-stone-950 hover:bg-blue-500 hover:text-white duration-300 text-base rounded-lg p-2 px-3 ${isActive ? "bg-blue-500 text-white" : ""}`}
                            to={"/login"}>Login</NavLink>}
                    <NavLink
                        className={({ isActive }) => `text-stone-950 hover:bg-blue-500 hover:text-white duration-300 text-base rounded-lg p-2 px-3 ${isActive ? "bg-blue-500 text-white" : ""}`}
                        to={"/settings"}>Settings</NavLink>
                    <NavLink
                        className={({ isActive }) => `text-stone-950 hover:bg-blue-500 hover:text-white duration-300 text-base rounded-lg p-2 px-3 ${isActive ? "bg-blue-500 text-white" : ""}`}
                        to={"/help-support"}>Help & Support</NavLink>
                </nav>
            </div>

            {/* left sidebar before 1280px(xl) for small screens */}
            <div className="col-span-4 md:col-span-2 max-w-[4.5rem] lg:hidden bg-sky-950">
                <button className="w-full h-[4rem] flex justify-center items-center">
                    <AiOutlineMenu className="text-2xl font-bold text-blue-500" />
                </button>

                <nav className="w-full flex flex-col gap-0 my-5">
                    <NavLink className={({ isActive }) => `flex justify-center items-center text-2xl p-2 ${isActive ? "text-blue-600" : "text-blue-800"}`} to={"/"}>
                        <RiLayoutMasonryFill />
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex justify-center items-center text-2xl p-2 ${isActive ? "text-blue-600" : "text-blue-800"}`} to={"/books"}>
                        <BiSolidBookAlt />
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex justify-center items-center text-2xl p-2 ${isActive ? "text-blue-600" : "text-blue-800"}`} to={"/members"}>
                        <HiUsers />
                    </NavLink>
                </nav>

                <nav className="w-full flex flex-col gap-0 my-5">
                    <NavLink className={({ isActive }) => `flex justify-center items-center text-2xl p-2 ${isActive ? "text-blue-600" : "text-blue-800"}`} to={"/settings"}>
                        <AiFillSetting />
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex justify-center items-center text-2xl p-2 ${isActive ? "text-blue-600" : "text-blue-800"}`} to={"/about"}>
                        <PiWarningCircleBold />
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex justify-center items-center text-2xl p-2 ${isActive ? "text-blue-600" : "text-blue-800"}`} to={"/help-support"}>
                        <HiUsers />
                    </NavLink>
                </nav>

            </div>

            {/* Right side of dashboard */}
            <div className="col-span-26 md:col-span-28 lg:col-span-24 xl:col-span-25 2xl:col-span-26 min-h-screen flex flex-col bg-white">

                {/* right top navigation */}
                <div className="w-full h-[4rem] flex justify-end items-center p-2">
                    <div className="w-fit flex justify-evenly items-center gap-2">
                        <button className="p-2 text-stone-500 hover:text-stone-950 duration-300">
                            <IoMdNotificationsOutline className="text-2xl font-normal" />
                        </button>

                        <div className="w-fit h-full flex justify-start gap-3 p-1">
                            {admin && <img
                                className="w-11 h-11 object-cover rounded-full"
                                src={admin.userImage}
                                alt="curr-user"
                            />}
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