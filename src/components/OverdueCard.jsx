import React from 'react'
import { RiMore2Fill } from "react-icons/ri";

function OverdueCard({ data }) {
    const { id, bookTitle, bookAuthor, bookThumbnail, memberName, memberImage, totalDelayDays, totalFine } = data;

    return (
        <article
            key={id}
            className="w-full bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition
                 flex flex-col gap-4 sm:grid sm:grid-cols-12 sm:items-center"
        >
            {/* User Section */}
            <div className="flex items-center gap-3 sm:col-span-3">
                <img
                    className="w-12 h-12 rounded-full object-cover border border-stone-200"
                    src={memberImage}
                    alt={memberName}
                />
                <div className="flex flex-col">
                    <h4 className="text-sm font-semibold text-stone-800 truncate">
                        {memberName}
                    </h4>
                    <span className="text-xs text-stone-500 bg-stone-100 px-2 py-[2px] rounded-full w-fit">
                        ID {id}
                    </span>
                </div>
            </div>

            {/* Book Section */}
            <div className="flex items-center gap-3 sm:col-span-5">
                <img
                    className="w-12 h-16 object-cover rounded shadow-sm"
                    src={bookThumbnail}
                    alt={bookTitle}
                />
                <div className="flex flex-col max-w-[14rem]">
                    <h4 className="text-sm font-semibold text-stone-800 truncate">
                        {bookTitle}
                    </h4>
                    <span className="text-xs text-stone-500 truncate">{bookAuthor}</span>
                </div>
            </div>

            {/* Overdue + Fine Section */}
            <div className="flex justify-between gap-6 sm:gap-0 sm:col-span-4">
                {/* Overdue */}
                <div className="flex flex-col items-center justify-center flex-1 border-t sm:border-t-0 sm:border-x border-stone-200 py-2 sm:py-0">
                    <span className="text-xs text-stone-500">Overdue</span>
                    <span className="text-sm font-bold text-red-600">
                        {totalDelayDays}d
                    </span>
                </div>

                {/* Fine */}
                <div className="flex flex-col items-center justify-center flex-1 border-t sm:border-t-0 sm:border-r border-stone-200 py-2 sm:py-0">
                    <span className="text-xs text-stone-500">Fine</span>
                    <span className="text-sm font-bold text-stone-800">₹ {totalFine}</span>
                </div>

                {/* More Action (only on sm+) */}
                <button className="hidden sm:flex items-center justify-center text-stone-500 hover:text-stone-900 transition px-2">
                    <RiMore2Fill className="text-xl" />
                </button>
            </div>
        </article>
    )
}

export default OverdueCard