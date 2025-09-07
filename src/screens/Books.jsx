import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import Book from '../components/Book';
import SearchBar from '../components/Search';
import { useNavigate, Outlet } from 'react-router-dom';

function Books() {
  const navigate = useNavigate();
  const { books } = useSelector((state) => state.books)
  const { overdueBooks } = useSelector((state) => state.overDue);
  const { requestbooks } = useSelector((state) => state.requestbooks);
  const { borrowedBooks } = useSelector((state) => state.borrowedBooks);

  return (
    <div className="w-full h-full px-2">
      <div className="w-full h-220 flex flex-col items-center border border-blue-200 bg-blue-100/40 rounded-lg">
        <div className="w-full min-h-[4rem] flex flex-col md:flex-row justify-between items-center">
          <nav className="w-full md:w-[35rem] h-[8rem] md:h-full grid grid-cols-2 md:grid-cols-4 gap-2">
            <NavLink className={({ isActive }) => `flex justify-center gap-2 items-center ${isActive ? "border-b-2 border-b-blue-500 text-stone-950" : ""}`} to={""}>
              All <span className="bg-blue-500 text-sm text-white rounded-xl px-2">{books.length}</span>
            </NavLink>
            <NavLink className={({ isActive }) => `flex justify-center gap-2 items-center ${isActive ? "border-b-2 border-b-blue-500 text-stone-950" : ""}`} to={"borrowed"}>
              Borrowed <span className="bg-blue-500 text-sm text-white rounded-xl px-2">{borrowedBooks.length}</span>
            </NavLink>
            <NavLink className={({ isActive }) => `flex justify-center gap-2 items-center ${isActive ? "border-b-2 border-b-blue-500 text-stone-950" : ""}`} to={"overdue"}>
              Overdue <span className="bg-blue-500 text-sm text-white rounded-xl px-2">{overdueBooks.length}</span>
            </NavLink>
            <NavLink className={({ isActive }) => `flex justify-center gap-2 items-center ${isActive ? "border-b-2 border-b-blue-500 text-stone-950" : ""}`} to={"requested"}>
              Request <span className="bg-blue-500 text-sm text-white rounded-xl px-2">{requestbooks.length}</span>
            </NavLink>
          </nav>

          <button className="w-full md:w-[10rem] h-[4rem] uppercase text-blue-700 hover:bg-blue-300/50 bg-blue-300" onClick={() => navigate('/addbook')}> + add Book </button>
        </div>
        <div className="w-full h-[4.5rem] flex justify-between items-center bg-white p-2">
          <SearchBar />
        </div>
        <div className="relative w-full h-full bg-white rounded-lg overflow-scroll">
          <ul className="hidden lg:grid sticky top-0 left-0 w-full h-[3rem] grid-cols-25 text-sm px-4 py-2 gap-1 bg-white z-10">
            <li className="col-span-2 flex items-center text-stone-500 font-medium">Thumbnail</li>
            <li className="col-span-6 flex items-center text-stone-500 font-medium">Title & Author</li>
            <li className="col-span-3 flex items-center text-stone-500 font-medium">Publisher</li>
            <li className="col-span-2 flex items-center text-stone-500 font-medium">Book ID</li>
            <li className="col-span-4 flex items-center text-stone-500 font-medium">ISBN</li>
            <li className="col-span-2 flex items-center text-stone-500 font-medium">Status</li>
            <li className="col-span-2 flex items-center text-stone-500 font-medium">Requests</li>
            <li className="col-span-4 flex items-center text-stone-500 font-medium">Actions</li>
          </ul>
          <div className="absolute top-10 left-0 w-full h-fit flex flex-col gap-1 overflow-scroll px-3 py-2 z-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Books