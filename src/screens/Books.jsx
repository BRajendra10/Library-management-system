import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
// import Book from '../components/Book';
import SearchBar from '../components/Search';
import { useNavigate, Outlet } from 'react-router-dom';

function Books() {
  const navigate = useNavigate();
  const { books } = useSelector((state) => state.books)
  const { overdueBooks } = useSelector((state) => state.overDue);
  const { requestbooks } = useSelector((state) => state.requestbooks);
  const { borrowedBooks } = useSelector((state) => state.borrowedBooks);

  const tabs = [
    { name: "All", path: "", count: books.length },
    { name: "Borrowed", path: "borrowed", count: borrowedBooks.length },
    { name: "Overdue", path: "overdue", count: overdueBooks.length },
    { name: "Requested", path: "requested", count: requestbooks.length },
  ];

  return (
    <div className="w-full h-full px-3">
      <div className="w-full h-220 flex flex-col items-center border border-blue-200 bg-blue-100/40 rounded-lg">
        <div className="w-full min-h-[4rem] flex justify-between overflow-x-scroll">
          <nav className="min-w-[35rem] h-[4rem] grid grid-cols-4 gap-2">
            {tabs.map((tab) => (
              <NavLink
                key={tab.name}
                to={tab.path}
                className={({ isActive }) => `flex justify-center gap-2 items-center ${isActive ? "border-b-2 border-b-blue-500 text-stone-950" : ""}`}
              >
                {tab.name}
                <span className="bg-blue-500 text-xs text-white rounded-full px-2 py-0.5">
                  {tab.count}
                </span>
              </NavLink>
            ))}
          </nav>

          <button className="hidden md:block w-[10rem] h-[4rem] uppercase text-blue-700 hover:bg-blue-300/50 bg-blue-300" onClick={() => navigate('/addbook')}> + add Book </button>
        </div>
        <div className="w-full h-[4rem] flex justify-between items-center bg-white p-2">
          <SearchBar />
        </div>
        <div className="relative w-full h-full bg-white rounded-lg overflow-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Books