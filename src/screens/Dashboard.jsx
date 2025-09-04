import React, { useState } from 'react'
import { AiOutlineMenu, AiFillSetting } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiLayoutMasonryFill, RiCloseLargeFill } from "react-icons/ri";
import { BiSolidBookAlt } from "react-icons/bi";
import { HiUsers } from "react-icons/hi2";
import { PiWarningCircleBold } from "react-icons/pi";
import Navigation from '../routes/Navigation';
import user from "../assets/user-1.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { removeUsersData } from '../features/LoginSlice';

function Dashboard() {
    const navigate = useNavigate();
    const { admin, isLogedIn } = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    function HandleLogout() {
        dispatch(removeUsersData(admin.id));
    }

    return (
        <div className="w-full h-screen grid grid-cols-30 bg-white">

            {/* Sidebar for desktop */}
            <div className="col-span-6 xl:col-span-5 2xl:col-span-4 hidden lg:flex flex-col gap-3 bg-white">
                <div className="col-span-6 xl:col-span-5 2xl:col-span-4  hidden lg:flex flex-col gap-3 bg-white">

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
                        <button className="w-full p-2 rounded-lg uppercase text-white bg-blue-500 hover:bg-blue-400" onClick={() => navigate("/lend")}>Lend / return</button>
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
                        {isLogedIn ? <button className="text-stone-950 hover:bg-blue-500 text-left hover:text-white duration-300 text-base rounded-lg p-2 px-3" onClick={() => HandleLogout()}>Logout</button> :
                            <NavLink
                                className={({ isActive }) => `text-stone-950 hover:bg-blue-500 hover:text-white duration-300 text-base rounded-lg p-2 px-3 ${isActive ? "bg-blue-500 text-white" : ""}`}
                                to={"/login"}>Login</NavLink>}
                        {/* <NavLink
                            className={({ isActive }) => `text-stone-950 hover:bg-blue-500 hover:text-white duration-300 text-base rounded-lg p-2 px-3 ${isActive ? "bg-blue-500 text-white" : ""}`}
                            to={"/about"}>About</NavLink> */}
                        {/* <NavLink
                            className={({ isActive }) => `text-stone-950 hover:bg-blue-500 hover:text-white duration-300 text-base rounded-lg p-2 px-3 ${isActive ? "bg-blue-500 text-white" : ""}`}
                            to={"/settings"}>Settings</NavLink> */}
                        {/* <NavLink
                            className={({ isActive }) => `text-stone-950 hover:bg-blue-500 hover:text-white duration-300 text-base rounded-lg p-2 px-3 ${isActive ? "bg-blue-500 text-white" : ""}`}
                            to={"/help-support"}>Help & Support</NavLink> */}
                    </nav>
                </div>
            </div>

            <div className={`fixed inset-y-0 left-0 w-70 bg-white shadow-lg z-50 transform transition-transform duration-300 lg:hidden
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>

                {/* Top bar inside mobile sidebar */}
                <div className="flex justify-between items-center h-[4rem] px-4">
                    <svg className="w-[3rem] h-full object-contain text-blue-500" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300.000000 300.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                            <path d="M445 2642 c-38 -6 -64 -25 -80 -57 -13 -29 -15 -134 -15 -849 0 -891 -1 -870 57 -899 17 -9 75 -17 148 -20 320 -16 593 -115 796 -289 31 -26 60 -48 63 -48 4 0 5 384 4 853 l-3 854 -30 43 c-133 194 -354 331 -620 384 -80 16 -283 34 -320 28z" />
                            <path d="M2425 2638 c-364 -25 -642 -165 -810 -408 l-30 -43 -3 -854 c-1 -469 0 -853 4 -853 3 0 32 22 63 48 203 174 476 273 796 289 73 3 131 11 148 20 58 29 57 8 57 899 0 715 -2 820 -15 849 -27 56 -57 63 -210 53z" />
                            <path d="M54 2259 c-11 -6 -28 -23 -37 -39 -16 -26 -17 -104 -17 -905 0 -762 2 -880 15 -905 29 -56 74 -62 227 -31 258 53 616 67 853 32 72 -11 139 -22 150 -26 34 -11 -44 52 -129 105 -148 92 -339 145 -578 160 -198 13 -274 53 -330 175 l-23 50 -3 698 -3 697 -52 -1 c-29 0 -61 -5 -73 -10z" />
                            <path d="M2818 1573 l-3 -698 -23 -50 c-56 -122 -132 -162 -330 -175 -239 -15 -430 -68 -578 -160 -85 -53 -163 -116 -129 -105 11 4 79 15 150 26 237 35 595 21 853 -32 153 -31 198 -25 227 31 13 25 15 143 15 905 0 800 -1 879 -17 905 -21 36 -52 50 -113 50 l-49 0 -3 -697z" />
                        </g>
                    </svg>
                    <span className="text-2xl">Library</span>
                    <button onClick={() => setSidebarOpen(false)}>
                        <RiCloseLargeFill className="text-2xl" />
                    </button>
                </div>

                {/* Sidebar content (reused from desktop) */}
                <div className="flex flex-col gap-3 h-full overflow-y-auto p-4">

                    {/* Lend/Return Button */}
                    <div className="w-full flex justify-center items-center">
                        <button
                            className="w-full p-2 rounded-lg uppercase text-white bg-blue-500 hover:bg-blue-400"
                            onClick={() => { navigate("/lend"); setSidebarOpen(false); }}
                        >
                            Lend / Return
                        </button>
                    </div>

                    {/* Main Navigation */}
                    <nav className="flex flex-col justify-center gap-1">
                        <NavLink
                            className={({ isActive }) =>
                                `text-stone-950 hover:bg-blue-500 hover:text-white duration-300 text-base rounded-lg p-2 px-3 ${isActive ? "bg-blue-500 text-white" : ""}`
                            }
                            to={"/"}
                            onClick={() => setSidebarOpen(false)}
                        >
                            Overview
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                `text-stone-950 hover:bg-blue-500 hover:text-white duration-300 text-base rounded-lg p-2 px-3 ${isActive ? "bg-blue-500 text-white" : ""}`
                            }
                            to={"/books"}
                            onClick={() => setSidebarOpen(false)}
                        >
                            Books
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                `text-stone-950 hover:bg-blue-500 hover:text-white duration-300 text-base rounded-lg p-2 px-3 ${isActive ? "bg-blue-500 text-white" : ""}`
                            }
                            to={"/members"}
                            onClick={() => setSidebarOpen(false)}
                        >
                            Members
                        </NavLink>
                        {isLogedIn ? (
                            <button
                                className="text-stone-950 hover:bg-blue-500 text-left hover:text-white duration-300 text-base rounded-lg p-2 px-3"
                                onClick={() => { HandleLogout(); setSidebarOpen(false); }}
                            >
                                Logout
                            </button>
                        ) : (
                            <NavLink
                                className={({ isActive }) =>
                                    `text-stone-950 hover:bg-blue-500 hover:text-white duration-300 text-base rounded-lg p-2 px-3 ${isActive ? "bg-blue-500 text-white" : ""}`
                                }
                                to={"/login"}
                                onClick={() => setSidebarOpen(false)}
                            >
                                Login
                            </NavLink>
                        )}
                        {/* <NavLink
                            className={({ isActive }) =>
                                `text-stone-950 hover:bg-blue-500 hover:text-white duration-300 text-base rounded-lg p-2 px-3 ${isActive ? "bg-blue-500 text-white" : ""}`
                            }
                            to={"/about"}
                            onClick={() => setSidebarOpen(false)}
                        >
                            About
                        </NavLink> */}
                        {/* <NavLink
                            className={({ isActive }) =>
                                `text-stone-950 hover:bg-blue-500 hover:text-white duration-300 text-base rounded-lg p-2 px-3 ${isActive ? "bg-blue-500 text-white" : ""}`
                            }
                            to={"/settings"}
                            onClick={() => setSidebarOpen(false)}
                        >
                            Settings
                        </NavLink> */}
                        {/* <NavLink
                            className={({ isActive }) =>
                                `text-stone-950 hover:bg-blue-500 hover:text-white duration-300 text-base rounded-lg p-2 px-3 ${isActive ? "bg-blue-500 text-white" : ""}`
                            }
                            to={"/help-support"}
                            onClick={() => setSidebarOpen(false)}
                        >
                            Help & Support
                        </NavLink> */}
                    </nav>
                </div>
            </div>


            {/* Overlay when sidebar is open */}
            {/* {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )} */}

            {/* Right side content */}
            <div className="col-span-30 lg:col-span-24 xl:col-span-25 2xl:col-span-26 min-h-screen flex flex-col bg-white">

                {/* Top Bar */}
                <div className="w-full min-h-[4rem] flex justify-between items-center p-2 px-4">
                    {/* Mobile Menu Button */}
                    <button className="lg:hidden p-2 text-blue-600" onClick={() => setSidebarOpen(true)}>
                        <AiOutlineMenu className="text-2xl" />
                    </button>

                    {/* Right Side (Notifications + User) */}
                    <div className="flex items-center gap-3 ml-auto">
                        <button className="p-2 text-stone-500 hover:text-stone-950 duration-300">
                            <IoMdNotificationsOutline className="text-2xl" />
                        </button>
                        <img
                            className="w-11 h-11 object-cover rounded-full"
                            src={isLogedIn ? admin.userImage : user}
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
