import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { postBorrowedBooks } from "../features/borrowedBooksSlice";
import { updateBookData } from "../features/BookSlice";

export default function IssueBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { borrowedBooks, today, futureDate } = useSelector((state) => state.borrowedBooks);
  const { books } = useSelector((state) => state.books);
  const { members } = useSelector((state) => state.members);

  const [bookQuery, setBookQuery] = useState("");
  const [memberQuery, setMemberQuery] = useState("");
  const [bookResults, setBookResults] = useState([]);
  const [memberResults, setMemberResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleClicking = () => {
    if (!selectedBook || !selectedMember) return;

    const { id, title, author, coverImage, copiesAvailable, isbn } = selectedBook;
    const { name, profileImage } = selectedMember;

    const availableIsbn = isbn.filter(
      (isbnNumber) => !borrowedBooks.some((book) => book.isbn === isbnNumber)
    );

    const data = {
      id: borrowedBooks.length + 1,
      bookTitle: title,
      bookAuthor: author,
      bookId: id,
      memberName: name,
      memberId: selectedMember.id,
      borrowDate: today,
      dueDate: futureDate,
      returnDate: null,
      totalDelayDays: 0,
      fineRate: 2,
      totalFine: 0,
      isbn: availableIsbn[0],
      bookThumbnail: coverImage,
      memberImage: profileImage,
    };

    dispatch(postBorrowedBooks({ newBook: data }));
    dispatch(
      updateBookData({
        id: selectedBook.id,
        updates: { copiesAvailable: copiesAvailable - 1 },
      })
    );
    navigate("/books");
  };

  useEffect(() => {
    setBookResults([]);
    setMemberResults([]);
    setSelectedBook(null);
    setSelectedMember(null);
    setBookQuery("");
    setMemberQuery("");
  }, []);

  const handleBookChange = (e) => {
    const value = e.target.value;
    setBookQuery(value);
    if (value.length > 0) {
      const filtered = books.filter(
        (b) =>
          b.copiesAvailable > 0 &&
          (b.title.toLowerCase().includes(value.toLowerCase()) ||
            b.author.toLowerCase().includes(value.toLowerCase()))
      );
      setBookResults(filtered);
    } else {
      setBookResults([]);
    }
  };

  const handleMemberChange = (e) => {
    const value = e.target.value;
    setMemberQuery(value);
    if (value.length > 0) {
      const filtered = members?.filter((m) =>
        m.name.toLowerCase().includes(value.toLowerCase())
      );
      setMemberResults(filtered);
    } else {
      setMemberResults([]);
    }
  };

  const clearBookSearch = () => {
    setBookQuery("");
    setBookResults([]);
    setSelectedBook(null);
  };

  const clearMemberSearch = () => {
    setMemberQuery("");
    setMemberResults([]);
    setSelectedMember(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 py-10 px-4">
      {/* Tabs */}
      <div className="w-full max-w-3xl grid grid-cols-2 bg-white/80 backdrop-blur-md shadow-md rounded-t-xl overflow-hidden">
        <NavLink
          className={({ isActive }) =>
            `text-center flex items-center justify-center py-3 font-semibold text-lg transition-all duration-300 ${isActive
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
              : "text-gray-400 hover:bg-gray-100"
            }`
          }
          to={"/lend"}
        >
          Lend Book
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `text-center flex items-center justify-center py-3 font-semibold text-lg transition-all duration-300 ${isActive
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
              : "text-gray-400 hover:bg-gray-100"
            }`
          }
          to={"/return"}
        >
          Return Book
        </NavLink>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-3xl bg-white rounded-b-xl shadow-lg p-6 mt-1 space-y-5">
        {/* Member Search */}
        <div>
          <label className="text-lg font-semibold text-stone-700 mb-1 block">
            Member Name
          </label>
          <div className="relative">
            <div className="flex items-center border border-blue-300 rounded-md shadow-sm">
              <input
                className="flex-1 h-11 px-3 outline-none text-stone-700 placeholder-stone-400"
                type="text"
                value={memberQuery}
                onChange={handleMemberChange}
                placeholder="Search members by name..."
              />
              {memberQuery && (
                <RxCross2
                  className="mx-2 text-lg text-stone-700 cursor-pointer hover:text-red-500"
                  onClick={clearMemberSearch}
                />
              )}
            </div>
            {memberResults.length > 0 && (
              <ul className="absolute top-12 left-0 w-full bg-white border border-blue-200 rounded-md shadow-md max-h-56 overflow-y-auto z-20">
                {memberResults.map((member, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                    onClick={() => {
                      setMemberQuery(member.name);
                      setMemberResults([]);
                      setSelectedMember(member);
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-stone-800">
                        {member.name}
                      </span>
                      <span className="text-sm text-stone-500">
                        {member.email}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Book Search */}
        <div>
          <label className="text-lg font-semibold text-stone-700 mb-1 block">
            Book Title
          </label>
          <div className="relative">
            <div className="flex items-center border border-blue-300 rounded-md shadow-sm">
              <input
                className="flex-1 h-11 px-3 outline-none text-stone-700 placeholder-stone-400"
                type="text"
                value={bookQuery}
                onChange={handleBookChange}
                placeholder="Search books by title or author..."
              />
              {bookQuery && (
                <RxCross2
                  className="mx-2 text-lg text-stone-700 cursor-pointer hover:text-red-500"
                  onClick={clearBookSearch}
                />
              )}
            </div>
            {bookResults.length > 0 && (
              <ul className="absolute top-12 left-0 w-full bg-white border border-blue-200 rounded-md shadow-md max-h-56 overflow-y-auto z-20">
                {bookResults.map((book, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                    onClick={() => {
                      setBookQuery(book.title);
                      setBookResults([]);
                      setSelectedBook(book);
                    }}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium text-stone-800">
                        {book.title}
                      </span>
                      <span className="text-sm text-stone-500">
                        {book.author}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Preview Section */}
        <div className="flex flex-wrap justify-between gap-3 bg-stone-50 border border-stone-200 rounded-lg p-4 shadow-inner">
          {selectedBook && (
            <div className="flex items-center gap-3 bg-gradient-to-br from-blue-100 to-blue-200 p-2 rounded-lg shadow-sm">
              <img
                className="w-12 h-16 object-cover rounded"
                src={selectedBook.coverImage}
                alt="book"
              />
              <div className="flex flex-col max-w-[10rem]">
                <h4 className="text-sm font-semibold text-stone-800 truncate">
                  {selectedBook.title}
                </h4>
                <span className="text-xs text-stone-600">
                  {selectedBook.author}
                </span>
              </div>
            </div>
          )}

          {selectedMember && (
            <div className="flex items-center gap-3 bg-gradient-to-br from-blue-100 to-blue-200 p-2 rounded-lg shadow-sm">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={selectedMember.profileImage}
                alt="user"
              />
              <div className="flex flex-col">
                <h4 className="text-sm font-semibold text-stone-800">
                  {selectedMember.name}
                </h4>
                <span className="text-xs text-stone-600">
                  {selectedMember.email}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center bg-blue-100 p-2 rounded-lg w-[8rem] shadow-sm">
            <h4 className="text-sm font-semibold text-stone-800">Lend Date</h4>
            <span className="text-xs text-stone-600">{today}</span>
          </div>

          <div className="flex flex-col items-center bg-blue-100 p-2 rounded-lg w-[8rem] shadow-sm">
            <h4 className="text-sm font-semibold text-stone-800">Due Date</h4>
            <span className="text-xs text-stone-600">{futureDate}</span>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleClicking}
          disabled={!(selectedBook && selectedMember)}
          className={`w-full py-3 mt-3 text-lg font-semibold rounded-lg transition-all duration-300 shadow-md ${selectedBook && selectedMember
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Confirm Lend
        </button>
      </div>
    </div>
  );
}
