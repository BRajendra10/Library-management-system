import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { updateBookData } from "../features/BookSlice";
import { deleteBorrowedBooks } from "../features/borrowedBooksSlice";

export default function ReturnBook() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { borrowedBooks, today } = useSelector((state) => state.borrowedBooks);
    const { books } = useSelector((state) => state.books);

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length > 0) {
            const filtered = borrowedBooks.filter(
                (b) =>
                    b.bookTitle.toLowerCase().includes(value.toLowerCase()) ||
                    b.memberName.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filtered);
        } else {
            setResults([]);
        }
    };

    const clearSearch = () => {
        setQuery("");
        setResults([]);
        setSelectedRecord(null);
    };

    const handleReturn = () => {
        if (!selectedRecord) return;
        const bookToUpdate = books.find((b) => b.id === selectedRecord.bookId);
        if (!bookToUpdate) return;

        dispatch(
            updateBookData({
                id: bookToUpdate.id,
                updates: { copiesAvailable: bookToUpdate.copiesAvailable + 1 },
            })
        );
        dispatch(deleteBorrowedBooks(selectedRecord.id));
        navigate("/books");
    };

    useEffect(() => {
        setQuery("");
        setResults([]);
        setSelectedRecord(null);
    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-blue-100 via-sky-100 to-indigo-100 gap-1 py-10">
            {/* Tabs */}
            <div className="w-[90%] max-w-3xl h-[3.5rem] grid grid-cols-2 border border-blue-200 rounded-t-xl overflow-hidden bg-white shadow-sm">
                <NavLink
                    to={"/lend"}
                    className={({ isActive }) =>
                        `text-center flex items-center justify-center font-semibold text-lg transition-all duration-300 ${isActive
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                            : "text-gray-400 hover:bg-gray-100"
                        }`
                    }
                >
                    Lend Book
                </NavLink>
                <NavLink
                    to={"/return"}
                    className={({ isActive }) =>
                        `text-center flex items-center justify-center font-semibold text-lg transition-all duration-300 ${isActive
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                            : "text-gray-400 hover:bg-gray-100"
                        }`
                    }
                >
                    Return Book
                </NavLink>
            </div>

            {/* Main Card */}
            <div className="w-[90%] max-w-3xl bg-white rounded-b-2xl shadow-lg p-6 border border-blue-100">
                <label className="text-lg font-semibold text-stone-700 mb-2 block">
                    Search by Book or Member
                </label>

                {/* Search Input */}
                <div className="relative">
                    <div className="flex items-center border border-blue-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                        <input
                            type="text"
                            value={query}
                            onChange={handleChange}
                            placeholder="Search borrowed books by title or member name..."
                            className="flex-1 px-4 py-2 rounded-lg outline-none text-gray-700 placeholder:text-gray-400"
                        />
                        {query && (
                            <button
                                onClick={clearSearch}
                                className="p-2 text-gray-500 hover:text-red-500"
                            >
                                <RxCross2 size={20} />
                            </button>
                        )}
                    </div>

                    {results.length > 0 && (
                        <ul className="absolute top-12 left-0 w-full bg-white border border-blue-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10 transition-all duration-200">
                            {results.map((record) => (
                                <li
                                    key={record.id}
                                    onClick={() => {
                                        setQuery(`${record.bookTitle} - ${record.memberName}`);
                                        setResults([]);
                                        setSelectedRecord(record);
                                    }}
                                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                                >
                                    <p className="font-medium text-gray-800">
                                        {record.bookTitle}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Borrowed by: {record.memberName}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Selected Record */}
                {selectedRecord && (
                    <div className="mt-6 bg-gradient-to-br from-sky-50 to-blue-100 p-4 rounded-xl shadow-inner">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Book Return Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Book */}
                            <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                                <img
                                    src={selectedRecord.bookThumbnail}
                                    alt="book"
                                    className="w-12 h-16 object-cover rounded-md"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-sm">
                                        {selectedRecord.bookTitle}
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                        {selectedRecord.bookAuthor}
                                    </p>
                                </div>
                            </div>

                            {/* Member */}
                            <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                                <img
                                    src={selectedRecord.memberImage}
                                    alt="user"
                                    className="w-12 h-12 object-cover rounded-full"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-sm">
                                        {selectedRecord.memberName}
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                        ID: {selectedRecord.memberId}
                                    </p>
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="flex flex-col justify-center bg-white p-3 rounded-lg shadow-sm text-center">
                                <h4 className="font-semibold text-gray-700 text-sm">
                                    Borrowed On
                                </h4>
                                <span className="text-xs text-gray-600">
                                    {selectedRecord.borrowDate}
                                </span>
                            </div>

                            <div className="flex flex-col justify-center bg-white p-3 rounded-lg shadow-sm text-center">
                                <h4 className="font-semibold text-gray-700 text-sm">
                                    Due Date
                                </h4>
                                <span className="text-xs text-gray-600">
                                    {selectedRecord.dueDate}
                                </span>
                            </div>

                            <div className="flex flex-col justify-center bg-white p-3 rounded-lg shadow-sm text-center">
                                <h4 className="font-semibold text-gray-700 text-sm">
                                    Returned On
                                </h4>
                                <span className="text-xs text-gray-600">{today}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Confirm Button */}
                <button
                    onClick={handleReturn}
                    disabled={!selectedRecord}
                    className={`mt-6 w-full py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ${selectedRecord
                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:scale-[1.02]"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    Confirm Return
                </button>
            </div>
        </div>
    );
}
