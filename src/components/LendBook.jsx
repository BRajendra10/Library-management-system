import React, { useContext } from "react";
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { LendingBookContext } from '../context/LendingBookContext';
import { SearchLendingBook } from "./SearchLendingBook";
import { SearchLendingMember } from "./SearchLendingMember";

function LendBook() {
    const { bookResults, memberResults } = useContext(LendingBookContext);
    const { borrowedBooks, today, futureDate } = useSelector((state) => state.borrowedBooks);

    const handleClicking = () => {
        const { id, title, author, thumbnail } = bookResults[0];
        const { name, userImage } = memberResults[0];
        const data = {
            "id": borrowedBooks.length + 1,
            "bookTitle": title,
            "bookAuthor": author,
            "bookId": id,
            "memberName": name,
            "memberId": memberResults[0].id,
            "borrowDate": today,
            "dueDate": futureDate,
            "returnDate": null,
            "totalDelayDays": 0,
            "fineRate": 2,
            "totalFine": 0,
            "isbn": "0262046305",
            "bookThumbnail": thumbnail,
            "memberImage": userImage
        }
        console.log(data);
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-stone-100">
            <div className="w-[50rem] h-[4rem] grid grid-cols-2 bg-white">
                <NavLink
                    className={({ isActive }) => `text-lg flex items-center p-3 ${isActive ? "bg-white text-black" : "bg-stone-200 text-stone-400"}`}
                    to={"/lend"}>Lend Book</NavLink>
                <NavLink
                    className={({ isActive }) => `text-lg flex items-center p-3 ${isActive ? "bg-white text-black" : "bg-stone-200 text-stone-400"}`}
                    to={"/return"}>Return Book</NavLink>
            </div>
            <div className="w-[50rem] max-h-[30rem] flex flex-col bg-white p-5">
                <label className="text-lg my-1" htmlFor="student / faculty">Student / Faculty</label>
                <SearchLendingMember />

                <label className="text-lg my-1 mt-3" htmlFor="Book">Book</label>
                <SearchLendingBook />

                <div className="w-full h-[4.5rem] flex justify-between gap-1 bg-stone-100 mt-5">
                    {bookResults.length === 1 && bookResults.map((el) => {
                        return <div className="flex items-center gap-3 max-w-[20rem] w-fit p-2 bg-red-100">
                            {/* Book Cover */}
                            <img
                                className="w-10 h-14 object-cover rounded"
                                src={el.thumbnail}
                                alt="book"
                            />

                            {/* Book Details */}
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

                <button className="bg-blue-500 text-white p-3 mt-5" onClick={handleClicking}>Conform Lend</button>
            </div>
        </div>
    )
}

export default LendBook
