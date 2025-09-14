import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { LendingBookContext } from '../context/LendingBookContext';
// import { updateBookData } from "../features/BookSlice";
import { deleteBorrowedBooks } from "../features/borrowedBooksSlice";

function ReturnBook() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { today, futureDate, borrowedBooks } = useSelector((state) => state.borrowedBooks);
    const { bookResults, memberResults } = useContext(LendingBookContext);

    const handleClicking = () => {
        // const { borrowDetails } = bookResults[0];
        const { name } = memberResults[0];
        // const borrowDetailsFiltered = borrowDetails.filter((detail) => detail.userId !== id);
        const data = borrowedBooks.filter((book) => book.memberName === name);

        // dispatch(
        //     updateBookData({
        //         id: bookResults[0].id,
        //         updates: {
        //             borrowDetails: borrowDetailsFiltered,
        //         },
        //     })
        // );
        dispatch(
            deleteBorrowedBooks(data[0].id)
        )

        navigate("/books");
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-stone-100">
            <div className="w-[25rem] sm:w-[40rem] lg:w-[50rem] max-w-[50rem] h-[4rem] grid grid-cols-2 bg-white">
                <NavLink
                    className={({ isActive }) => `text-lg flex items-center p-3 ${isActive ? "bg-white text-black" : "bg-stone-200 text-stone-400"}`}
                    to={"/lend"}>Lend Book</NavLink>
                <NavLink
                    className={({ isActive }) => `text-lg flex items-center p-3 ${isActive ? "bg-white text-black" : "bg-stone-200 text-stone-400"}`}
                    to={"/return"}>Return Book</NavLink>
            </div>
            <div className="w-[25rem] sm:w-[40rem] lg:w-[50rem] max-w-[50rem] max-h-[30rem] flex flex-col bg-white p-5">
                <label className="text-lg my-1" htmlFor="student / faculty">
                    Student / Faculty
                </label>
                <SearchLendingMember />

                <label className="text-lg my-1 mt-3" htmlFor="Book">
                    Book
                </label>
                <SearchLendingBook />

                <div className="w-full h-[4.5rem] flex justify-between gap-1 bg-stone-100 mt-5">
                    {bookResults.length === 1 && bookResults.map((el) => {
                        return <div className="flex items-center gap-3 max-w-[20rem] w-fit p-2 bg-red-100">
                            <img
                                className="w-10 h-14 object-cover rounded"
                                src={el.thumbnail}
                                alt="book"
                            />

                            <div className="flex flex-col max-w-[10rem]">
                                <h4 className="text-sm font-semibold text-stone-800">
                                    {el.title}{" "}
                                </h4>
                                <span className="text-xs text-stone-500 bg-stone-100 py-[2px] rounded">
                                    {el.author}
                                </span>
                            </div>
                        </div>
                    })}

                    {memberResults.length === 1 && memberResults.map((el) => {
                        return <div className="flex items-center gap-3 max-w-[20rem] w-fit p-2 bg-red-100">
                            <img
                                className="w-10 h-10 rounded-full object-cover"
                                src={el.userImage}
                                alt="user"
                            />
                            <div className="flex flex-col">
                                <h4 className="text-sm font-semibold text-stone-800">{el.name}</h4>
                                <span className="text-xs text-stone-500 bg-stone-100 py-[2px] rounded">
                                    {el.email}
                                </span>
                            </div>
                        </div>
                    })}

                    <div className="w-[8rem] flex flex-col justify-center items-center gap-1 bg-red-100">
                        <h4 className="text-sm font-semibold">Lending Date</h4>
                        <span className="text-xs bg-white text-stone-500">{today}</span>
                    </div>
                    <div className="w-[8rem] flex flex-col justify-center items-center gap-1 bg-red-100">
                        <h4 className="text-sm font-semibold">Due Date</h4>
                        <span className="text-xs bg-white text-stone-500">{futureDate}</span>
                    </div>
                </div>

                <button
                    className={`p-3 mt-5 rounded text-white ${bookResults.length === 1 && memberResults.length === 1
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                    disabled={!(bookResults.length === 1 && memberResults.length === 1)}
                    onClick={handleClicking}
                >
                    Confirm Return
                </button>
            </div>
        </div>
    )
}

export default ReturnBook


/* ----------------- Book Search ----------------- */
export function SearchLendingBook() {
    const { books } = useSelector((state) => state.books);
    const { setBookResults } = useContext(LendingBookContext);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 0) {
            const filtered = books.filter(
                (b) =>
                    b.title.toLowerCase().includes(value.toLowerCase()) ||
                    b.author.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filtered);
        } else {
            setResults([]);
        }
    };

    const clearSearch = () => {
        setQuery("");
        setResults([]);
        setBookResults([]);
    };

    return (
        <div className="relative max-w-full my-1">
            <div className="h-11 flex items-center border border-blue-200 rounded-sm">
                <input
                    className="flex-1 h-full py-1 px-2 outline-none"
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search books by title or author"
                />
                {query && (
                    <div className="w-10 h-full flex justify-center items-center">
                        <RxCross2
                            className="text-lg text-stone-950 cursor-pointer"
                            onClick={clearSearch}
                        />
                    </div>
                )}
            </div>

            {results.length > 0 && (
                <ul className="absolute top-12 left-0 w-full bg-white border border-blue-200 rounded-sm shadow-lg max-h-60 overflow-y-auto z-10">
                    {results.map((book) => (
                        <li
                            key={book.id}
                            className="px-3 py-2 hover:bg-blue-50 cursor-pointer"
                            onClick={() => {
                                setQuery(book.title);
                                setResults([]);
                                setBookResults([book]); // ✅ set selected book
                            }}
                        >
                            <span className="font-medium">{book.title}</span>{" "}
                            <span className="text-stone-500 text-sm">by {book.author}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

/* ----------------- Member Search ----------------- */
export function SearchLendingMember() {
    const { members } = useSelector((state) => state.members);
    const { setMemberResults } = useContext(LendingBookContext);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 0) {
            const filteredMembers = members?.filter((m) =>
                m.name.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filteredMembers);
        } else {
            setResults([]);
        }
    };

    const clearSearch = () => {
        setQuery("");
        setResults([]);
        setMemberResults([]);
    };

    return (
        <div className="relative max-w-full my-1">
            <div className="h-11 flex items-center border border-blue-200 rounded-sm">
                <input
                    className="flex-1 h-full py-1 px-2 outline-none"
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search members by name"
                />
                {query && (
                    <div className="w-10 h-full flex justify-center items-center">
                        <RxCross2
                            className="text-lg text-stone-950 cursor-pointer"
                            onClick={clearSearch}
                        />
                    </div>
                )}
            </div>

            {results.length > 0 && (
                <ul className="absolute top-12 left-0 w-full bg-white border border-blue-200 rounded-sm shadow-lg max-h-60 overflow-y-auto z-10">
                    {results.map((member) => (
                        <li
                            key={member.id}
                            className="px-3 py-2 hover:bg-blue-50 cursor-pointer"
                            onClick={() => {
                                setQuery(member.name);
                                setResults([]);
                                setMemberResults([member]); // ✅ set selected member
                            }}
                        >
                            <div className="flex flex-col">
                                <span className="font-medium">{member.name}</span>
                                <span className="text-stone-500 text-sm">{member.email}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
