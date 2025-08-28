import React, { useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

function Book({ data, index }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full rounded-md mb-1">
            {/* Main Row */}
            <ul className={`w-full grid grid-cols-25 p-2 gap-1 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition"`}>
                <li className="flex items-center"><input type="checkbox" className="w-4 h-4" /></li>
                <li className="col-span-2 flex justify-start items-center"><img className="w-16 h-20 rounded-sm object-cover shadow-sm" src={data?.thumbnail} /></li>
                <li className="col-span-6 flex flex-col justify-center">
                    <span className="w-80 text-base font-semibold truncate">{data?.title}</span>
                    <span className="w-80 text-sm text-gray-500 truncate">by {data?.author}</span>
                </li>
                <li className="col-span-3 flex items-center">{data?.publisher}</li>
                <li className="col-span-2 flex items-center">ID {data?.id}</li>
                <li className="col-span-3 flex flex-col justify-center">
                    <span>{data?.isbn[0]}</span>
                    <span>{data?.isbn[1]}</span>
                </li>
                <li className="col-span-2 flex items-center">
                    <span className={`px-2 py-0.5 rounded-full text-sm font-medium ${data?.status === "Borrowed" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"}`}>
                        {data?.status}
                    </span>
                </li>
                <li className="col-span-2 flex items-center">{data?.requestDetails.length}</li>
                <li className="col-span-4 flex items-center gap-2">
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"><TbEdit size={18} /></button>
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"><MdDeleteOutline size={18} /></button>
                    <button
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <IoIosArrowDown size={18} /> : <IoIosArrowForward size={18} />}
                    </button>
                </li>
            </ul>

            {/* Expanded Details */}
            {isOpen && (
                <div className="w-full bg-gray-50 p-4 border-t border-gray-200">
                    <ul className="grid grid-cols-28 gap-4 text-gray-700 text-sm">
                        <li className="col-start-2 col-span-6 flex flex-col">
                            <span className="font-semibold">Description:</span>
                            <span className="">{data?.description}</span>
                        </li>
                        <li className="col-span-5 flex flex-col">
                            <span className="font-semibold">Keywords:</span>
                            <div className="flex gap-1 flex-wrap">
                                {data?.keywords.map((el) => <span className="px-1 bg-blue-200/50 border border-blue-200 rounded-sm">{el}</span>)}
                            </div>
                            {/* <span className="">{data?.keywords?.join(', ')}</span> */}
                        </li>
                        <li className="col-span-3 flex flex-col">
                            <span className="font-semibold">Department:</span>
                            <span>{data?.department}</span>
                        </li>
                        <li className="col-span-2 flex flex-col">
                            <span className="font-semibold">Subject:</span>
                            <span className="truncate">{data?.subject}</span>
                        </li>
                        <li className="col-span-3 flex flex-col">
                            <span className="font-semibold">Books Call Number:</span>
                            <span>{data?.callNumber}</span>
                        </li>
                        <li className="col-span-2 flex flex-col">
                            <span className="font-semibold">Language:</span>
                            <span>{data?.language}</span>
                        </li>
                        <li className="col-span-2 flex flex-col">
                            <span className="font-semibold">Page Count:</span>
                            <span>{data?.pageCount}</span>
                        </li>
                        <li className="col-span-2 flex flex-col gap-5">
                            <div className="col-span-2 flex flex-col">
                                <span className="font-semibold">Added Date:</span>
                                <span>{data?.addedDate}</span>
                            </div>
                            <div className="col-span-2 flex flex-col">
                                <span className="font-semibold">Edition:</span>
                                <span>{data?.edition}</span>
                            </div>
                        </li>

                    </ul>
                </div>
            )}
        </div>
    );
}

export default Book;