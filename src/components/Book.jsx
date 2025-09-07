import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { removeBooksData } from '../features/BookSlice';
import { BookContext } from '../context/BookContext';

function Book({ data, index }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { handleEdit, handleId } = useContext(BookContext);
  const { login } = useSelector((state) => state.login);

  const {
    id, title, author, publisher, isbn,
    status, requestDetails, description,
    keywords, department, subject,
    callNumber, language, pageCount,
    addedDate, edition, thumbnail
  } = data;

  const handleDelete = (id) => {
    if (login.membershipType === "admin") {
      dispatch(removeBooksData(id));
    } else {
      navigate('/');
    }
  };

  const editedBookData = () => {
    if (login.membershipType === "admin") {
      handleId(id);
      handleEdit(data);
      navigate('/addbook');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="w-full mb-2" key={index}>
      {/* ✅ Desktop Table Row */}
      <ul
        className={`hidden lg:grid grid-cols-25 p-2 gap-1 ${
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
        } hover:bg-gray-100 transition`}
      >
        <li className="col-span-2 flex justify-start items-center">
          <img
            className="w-16 h-20 rounded-sm object-cover shadow-sm"
            src={thumbnail}
            alt={title}
          />
        </li>
        <li className="col-span-6 flex flex-col justify-center">
          <span className="text-base font-semibold truncate">{title}</span>
          <span className="text-sm text-gray-500 truncate">by {author}</span>
        </li>
        <li className="col-span-3 flex items-center">{publisher}</li>
        <li className="col-span-2 flex items-center text-gray-600">#{id}</li>
        <li className="col-span-4 flex flex-col justify-center">
          {isbn.map((code, i) => (
            <span key={i} className="truncate">{code}</span>
          ))}
        </li>
        <li className="col-span-2 flex items-center">
          <span
            className={`px-2 py-0.5 rounded-full text-sm font-medium ${
              status === "Borrowed"
                ? "bg-red-100 text-red-500"
                : "bg-green-100 text-green-500"
            }`}
          >
            {status}
          </span>
        </li>
        <li className="col-span-2 flex items-center text-gray-600">
          {requestDetails?.length || 0}
        </li>
        <li className="col-span-4 flex items-center gap-2">
          <button
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
            onClick={() => editedBookData()}
          >
            <TbEdit size={18} />
          </button>
          <button
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
            onClick={() => handleDelete(id)}
          >
            <MdDeleteOutline size={18} />
          </button>
          <button
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoIosArrowDown size={18} /> : <IoIosArrowForward size={18} />}
          </button>
        </li>
      </ul>

      {/* ✅ Expandable Details for Desktop */}
      {isOpen && (
        <div className="hidden lg:block col-span-25 bg-gray-50 border-t p-4 text-sm text-gray-700">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-2">
              <p><span className="font-semibold">Description:</span> {description}</p>
              <p><span className="font-semibold">Keywords:</span> {keywords.join(", ")}</p>
              <p><span className="font-semibold">Department:</span> {department}</p>
              <p><span className="font-semibold">Subject:</span> {subject}</p>
            </div>
            {/* Right Column */}
            <div className="space-y-2">
              <p><span className="font-semibold">Call No:</span> {callNumber}</p>
              <p><span className="font-semibold">Language:</span> {language}</p>
              <p><span className="font-semibold">Pages:</span> {pageCount}</p>
              <p><span className="font-semibold">Edition:</span> {edition}</p>
              <p><span className="font-semibold">Added Date:</span> {addedDate}</p>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Mobile Card */}
      <div
        className={`lg:hidden w-full rounded-lg shadow-sm p-3 flex flex-col gap-3 ${
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
        }`}
      >
        {/* Card main layout */}
        <div className="flex gap-3">
          <img
            className="w-20 h-28 rounded object-cover shadow-sm flex-shrink-0"
            src={thumbnail}
            alt={title}
          />
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-base font-semibold truncate">{title}</span>
            <span className="text-sm text-gray-500 truncate">by {author}</span>
            <span className="text-xs text-gray-400">Publisher: {publisher}</span>
            <div className="flex gap-2 mt-1">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  status === "Borrowed"
                    ? "bg-red-100 text-red-500"
                    : "bg-green-100 text-green-500"
                }`}
              >
                {status}
              </span>
              <span className="text-xs text-gray-600">
                Requests: {requestDetails?.length || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <button
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
            onClick={() => editedBookData()}
          >
            <TbEdit size={18} />
          </button>
          <button
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
            onClick={() => handleDelete(id)}
          >
            <MdDeleteOutline size={18} />
          </button>
          <button
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoIosArrowDown size={18} /> : <IoIosArrowForward size={18} />}
          </button>
        </div>

        {/* Expandable Details */}
        {isOpen && (
          <div className="mt-2 border-t pt-2 text-sm text-gray-700 space-y-1">
            <p><span className="font-semibold">Description:</span> {description}</p>
            <p><span className="font-semibold">Keywords:</span> {keywords.join(", ")}</p>
            <p><span className="font-semibold">Department:</span> {department}</p>
            <p><span className="font-semibold">Subject:</span> {subject}</p>
            <p><span className="font-semibold">Call No:</span> {callNumber}</p>
            <p><span className="font-semibold">Language:</span> {language}</p>
            <p><span className="font-semibold">Pages:</span> {pageCount}</p>
            <p><span className="font-semibold">Edition:</span> {edition}</p>
            <p><span className="font-semibold">Added Date:</span> {addedDate}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Book;
