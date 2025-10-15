import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Book from "../components/Book";

import { GrSearch } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";

function Books() {
  const navigate = useNavigate();
  const { books } = useSelector((state) => state.books);

  const [query, setQuery] = useState("");
  const [dropdown, setDropdown] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 0) {
        const filtered = books.filter(
          (book) =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        );
        setDropdown(filtered);
      } else {
        setDropdown([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, books]);

  const handleClear = () => {
    setQuery("");
    setDropdown([]);
  };

  const handleSelect = (book) => {
    setQuery(book.title);
    setDropdown([]);
    // You can later add your own logic here to handle what happens on select
  };

  return (
    <div className="w-full h-screen grid grid-cols-12 bg-blue-100 p-3 md:p-5 gap-5 overflow-y-scroll">
      {/* Header */}
      <div className="col-span-12 flex flex-col gap-2 px-8 py-2">
        <h2 className="text-3xl font-semibold">Keep the story going...</h2>
        <span className="text-xl text-gray-500">
          Don't let the magic of reading fade — check out more books
        </span>
      </div>

      {/* Search Bar */}
      <div className="col-span-12 flex justify-between items-center gap-2 px-8 relative">
        <div className="relative w-fit flex items-center rounded-lg px-2 py-1 bg-blue-200/50">
          {query ? (
            <IoCloseSharp
              size={18}
              onClick={handleClear}
              className="cursor-pointer"
            />
          ) : (
            <GrSearch size={18} />
          )}
          <input
            className="w-80 h-10 outline-none p-2 ml-3 bg-transparent"
            type="text"
            placeholder="Search books by title or author"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Dropdown suggestions only */}
          {dropdown.length > 0 && (
            <ul className="absolute top-12 left-0 w-full bg-white border border-blue-200 rounded-sm shadow-lg max-h-60 overflow-y-auto z-10">
              {dropdown.map((book) => (
                <li
                  key={book.id}
                  className="px-3 py-2 hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleSelect(book)}
                >
                  <span className="font-medium">{book.title}</span>{" "}
                  <span className="text-stone-500 text-sm">
                    by {book.author}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="bg-blue-950 text-sm text-white rounded-lg px-4 py-3"
          onClick={() => navigate("/addbook")}
        >
          + Add new book
        </button>
      </div>

      {/* Original Category Sections (Unchanged) */}
      <div className="col-span-12 flex flex-col border-b border-zinc-400 gap-5 p-8">
        <h2 className="text-xl font-semibold">Programming</h2>
        <div className="flex gap-5 overflow-x-auto scrollbar-hide">
          {books.map(
            (el, index) =>
              el.category === "Programming" && <Book data={el} key={index} />
          )}
        </div>
      </div>

      <div className="col-span-12 flex flex-col border-b border-zinc-400 gap-5 p-8">
        <h2 className="text-xl font-semibold">Mathematics</h2>
        <div className="flex gap-5 overflow-x-auto scrollbar-hide">
          {books.map(
            (el, index) =>
              el.category === "Mathematics" && <Book data={el} key={index} />
          )}
        </div>
      </div>

      <div className="col-span-12 flex flex-col border-b border-zinc-400 gap-5 p-8">
        <h2 className="text-xl font-semibold">Science</h2>
        <div className="flex gap-5 overflow-x-auto scrollbar-hide">
          {books.map(
            (el, index) =>
              el.category === "Science" && <Book data={el} key={index} />
          )}
        </div>
      </div>

      <div className="col-span-12 flex flex-col border-b border-zinc-400 gap-5 p-8">
        <h2 className="text-xl font-semibold">Romance</h2>
        <div className="flex gap-5 overflow-x-auto scrollbar-hide">
          {books.map(
            (el, index) =>
              el.category === "Romance" && <Book data={el} key={index} />
          )}
        </div>
      </div>

      <div className="col-span-12 flex flex-col border-b border-zinc-400 gap-5 p-8">
        <h2 className="text-xl font-semibold">Fiction</h2>
        <div className="flex gap-5 overflow-x-auto scrollbar-hide">
          {books.map(
            (el, index) =>
              el.category === "Fiction" && <Book data={el} key={index} />
          )}
        </div>
      </div>

      <div className="col-span-12 flex flex-col border-b border-zinc-400 gap-5 p-8">
        <h2 className="text-xl font-semibold">Self-Help</h2>
        <div className="flex gap-5 overflow-x-auto scrollbar-hide">
          {books.map(
            (el, index) =>
              el.category === "Self-Help" && <Book data={el} key={index} />
          )}
        </div>
      </div>

      <div className="col-span-12 flex flex-col border-b border-zinc-400 gap-5 p-5">
        <h2 className="text-xl font-semibold">Philosophy</h2>
        <div className="flex gap-5 overflow-x-auto scrollbar-hide">
          {books.map(
            (el, index) =>
              el.category === "Philosophy" && <Book data={el} key={index} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Books;
