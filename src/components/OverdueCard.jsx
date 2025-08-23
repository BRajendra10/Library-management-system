import React from 'react'
import { RiMore2Fill } from "react-icons/ri";

function OverdueCard({id, data }) {
    const { cover, title, memberImage, memberName, overdueDays, fine } = data;

    return (
        <article className="w-full h-[5rem] flex items-center justify-between bg-white rounded-lg px-4" key={id}>
            {/* User Section */}
            <div className="flex items-center gap-3 w-[10rem]">
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={memberImage}
                    alt="user"
                />
                <div className="flex flex-col">
                    <h4 className="text-sm font-semibold text-stone-800 truncate">{memberName}</h4>
                    <span className="text-xs text-stone-500 bg-stone-100 px-2 py-[2px] rounded">
                        #321352
                    </span>
                </div>
            </div>

            {/* Book Section */}
            <div className="flex items-center gap-3 w-[18rem] pl-4">
                {/* Book Cover */}
                <img
                    className="w-10 h-14 object-cover rounded"
                    src={cover}
                    alt="book"
                />

                {/* Book Details */}
                <div className="flex flex-col max-w-[12rem]">
                    <h4 className="text-sm font-semibold text-stone-800 truncate">
                        {title}{" "}
                        <span className="font-normal text-stone-500">by George S. Clason</span>
                    </h4>
                    <span className="text-xs text-stone-500 bg-stone-100 px-2 py-[2px] rounded">
                        #4235532
                    </span>
                </div>
            </div>


            {/* Overdue */}
            <div className="flex flex-col items-center justify-center w-[8rem] h-fit border-l border-stone-300">
                <span className="text-xs text-stone-500">Overdue</span>
                <span className="text-sm font-bold text-stone-800">{overdueDays ? overdueDays : "--"} Days</span>
            </div>

            {/* Fine */}
            <div className="flex flex-col items-center justify-center w-[6rem] h-fit border-l border-stone-300">
                <span className="text-xs text-stone-500">Fine</span>
                <span className="text-sm font-bold text-stone-800">₹ {fine ? fine : "--"}</span>
            </div>

            {/* More Action */}
            <button className="flex items-center justify-center w-8 h-8 text-stone-600 hover:text-stone-900 border-l border-stone-300">
                <RiMore2Fill className="text-xl" />
            </button>
        </article>
    )
}

export default OverdueCard