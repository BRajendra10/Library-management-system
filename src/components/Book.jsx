import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";

function Book({data}) {

    return (
        <ul className="w-full h-[7rem] grid grid-cols-25 text-sm/6 p-2 gap-1 bg-stone-100 z-5">
            <li className="flex items-center text-stone-950">
                <input className="w-4 h-4" type="checkbox" name="select-all-member" id="select-all-member" />
            </li>
            <li className="col-span-2 flex justify-start items-center text-stone-950">
                <img className="w-15 h-20" src={data?.thumbnail} alt="" />
            </li>
            <li className="col-span-5 flex flex-col justify-center items-start text-stone-950">
                <span className="w-70 text-base text-stone-950 font-semibold truncate">{data?.title}</span>
                <span className="w-70 text-sm text-stone-500 truncate">by {data?.author}</span>
            </li>
            <li className="col-span-3 font-semibold flex items-center text-stone-950">{data?.publisher}</li>
            <li className="col-span-3 font-semibold flex items-center text-stone-950">ID {data?.id}</li>
            <li className="col-span-3 font-semibold flex flex-col justify-center text-stone-950">
                <span>{data?.isbn[0]}</span>
                <span>{data?.isbn[1]}</span>
            </li>
            <li className="col-span-2 flex items-center text-stone-950">
                {data?.status == "Borrowed" ? 
                <span className="px-2 rounded-sm text-red-500 bg-red-100">Borrowed</span> : 
                <span className="px-2 rounded-sm text-green-500 bg-green-100">Avilable</span>}
                
            </li>
            <li className="col-span-2 font-semibold flex items-center text-stone-950">{data?.requestDetails.length}</li>
            <li className="col-span-4 flex items-center gap-2 text-stone-950">
                <button className="p-2 text-black bg-blue-100 rounded-sm"><TbEdit size={19} /></button>
                <button className="p-2 text-black bg-blue-100 rounded-sm"><MdDeleteOutline size={19} /></button>
                <button className="p-2 text-black bg-blue-100 rounded-sm"><IoIosArrowForward size={19} /></button>
            </li>
        </ul>
    )
}

export default Book