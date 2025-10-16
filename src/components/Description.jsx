import React from "react";

import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

import { removeBooksData } from "../features/BookSlice";

function Description() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { bookData } = location.state;

    // Handlers
    const handleEdit = () => {
        navigate("/addbook", { state: { bookData } });
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${bookData.title}"?`
        );
        if (confirmDelete) {
            // Placeholder for your delete logic (e.g., API call or Firestore delete)
            dispatch(removeBooksData(bookData.id));
            console.log("Deleting book:", bookData.id);
            navigate("/books");
        }
    };

    return (
        <div className="w-full h-screen px-8 py-10 bg-[#eef2fb] overflow-y-scroll">
            {/* Top Message Section */}
            <div className="max-w-6xl mx-auto flex items-center justify-between mb-10">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-800">
                        Keep the story going...
                    </h2>
                    <p className="text-slate-600 text-sm">
                        Don’t let the magic of reading fade — explore more checked-out books!
                    </p>
                </div>

                <div className="flex gap-3">
                    {/* Edit Book Button */}
                    <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:bg-blue-700 transition"
                    >
                        <FiEdit2 size={16} />
                        Edit
                    </button>

                    {/* Delete Book Button */}
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:bg-red-600 transition"
                    >
                        <FiTrash2 size={16} />
                        Delete
                    </button>

                    {/* Next Button */}
                    <button className="bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-slate-900 transition">
                        Next →
                    </button>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="max-w-6xl mx-auto bg-white/80 rounded-2xl shadow-lg p-10 flex flex-col md:flex-row items-start gap-10">
                {/* Left - Book Image */}
                <div className="md:w-1/3 flex justify-center relative">
                    <img
                        src={bookData.coverImage}
                        alt={bookData.title}
                        className="w-72 h-[420px] rounded-xl shadow-2xl transform rotate-[-5deg] hover:rotate-0 transition-transform duration-300"
                    />
                </div>

                {/* Right - Book Details */}
                <div className="md:w-2/3 flex flex-col justify-center space-y-6">
                    {/* Title + Author */}
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900">
                            {bookData.title}
                        </h1>
                        <p className="text-lg font-medium text-slate-700 mt-1">
                            By {bookData.author}
                        </p>
                    </div>

                    {/* Summary */}
                    <p className="text-slate-700 leading-relaxed">
                        {bookData.description}
                    </p>

                    {/* Description Section */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-slate-800 mb-2">
                            Description
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-justify">
                            “{bookData.title}” by {bookData.author} is a highly regarded work
                            on {bookData.category.toLowerCase()}, focusing on{" "}
                            {bookData.tags.slice(0, 2).join(" and ")}. {bookData.description}.
                        </p>
                    </div>

                    {/* Info Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 border-t border-slate-200 pt-6">
                        <div>
                            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                                ISBN
                            </h4>
                            <p className="text-slate-800 font-medium mt-1">
                                {bookData.isbn.join(", ")}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                                Category
                            </h4>
                            <p className="text-slate-800 font-medium mt-1">
                                {bookData.category}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                                Copies Available
                            </h4>
                            <p className="text-slate-800 font-medium mt-1">
                                {bookData.copiesAvailable}
                            </p>
                        </div>
                    </div>

                    {/* Reviewer Section */}
                    <div className="flex items-center gap-4 mt-8 pt-4 border-t border-slate-200">
                        <img
                            src="https://i.pravatar.cc/50?img=12"
                            alt="Reviewer"
                            className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                        />
                        <div>
                            <h4 className="text-slate-900 font-semibold">Jay Shetty</h4>
                            <p className="text-slate-600 text-sm max-w-lg">
                                “An exceptional piece of work that seamlessly blends technical
                                depth and craftsmanship. A must-read for developers aiming for
                                excellence.”
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Description;
