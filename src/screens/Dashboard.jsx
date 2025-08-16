import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import user from "../assets/user-1.jpg";

function Dashboard() {
    return (
        <div className="w-full h-screen grid grid-cols-22 bg-stone-200">

            {/* left sidebar before 1280px(xl) */}
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

                {/* Navigation(temperary) */}
                <nav className="py-2 pr-3">
                    <ul className="w-full flex flex-col justify-between gap-0">
                        <li className="text-stone-700 hover:bg-blue-200 hover:text-stone-950 rounded-r-3xl px-4 py-2"><a className="" href="#">Overview</a></li>
                        <li className="text-stone-700 hover:bg-blue-200 hover:text-stone-950 rounded-r-3xl px-4 py-2"><a className="" href="#">Books</a></li>
                        <li className="text-stone-700 hover:bg-blue-200 hover:text-stone-950 rounded-r-3xl px-4 py-2"><a className="" href="#">Members</a></li>
                    </ul>
                </nav>

                {/* Navigation(temperary) */}
                <nav className="py-2 pr-3">
                    <ul className="w-full flex flex-col justify-between gap-0">
                        <li className="text-stone-700 hover:bg-blue-200 hover:text-stone-950 rounded-r-3xl px-4 py-2"><a className="" href="#">Settings</a></li>
                        <li className="text-stone-700 hover:bg-blue-200 hover:text-stone-950 rounded-r-3xl px-4 py-2"><a className="" href="#">About</a></li>
                        <li className="text-stone-700 hover:bg-blue-200 hover:text-stone-950 rounded-r-3xl px-4 py-2"><a className="" href="#">Help & support</a></li>
                    </ul>
                </nav>
            </div>

            {/* left sidebar after 1280px(xl) */}
            <div className="grid-cols-[minmax(250px,2fr)_auto] xl:hidden bg-blue-300">
                <div className="w-full h-[4rem] flex justify-center items-center">
                    <AiOutlineMenu className="text-xl" />
                </div>
            </div>

            {/* Right side of dashboard */}
            <div className="col-span-21 xl:col-span-18 2xl:col-span-19 flex flex-col bg-stone-50">

                {/* right top navigation */}
                <div className="w-full h-[4rem] flex justify-between items-center p-2">
                    {/* <button className="xl:hidden p-2 text-2xl text-stone-500 hover:text-stone-950 rounded-full duration-300"><AiOutlineMenu /></button> */}
                    
                    <div className="flex items-center gap-4">
                        <span className="p-2 text-2xl text-stone-500 hover:text-stone-950 rounded-full duration-300"><IoMdNotificationsOutline /></span>

                        <div className="w-12 h-12 rounded-full border-2 border-blue-400 p-1">
                            <img className="w-full h-full object-cover rounded-full" src={user} alt="curr-user" />
                        </div>
                    </div>
                </div>

                <div className="w-full h-220 bg-stone-200"></div>
            </div>
        </div>
    )
}

export default Dashboard