import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux actions
import { removeBooksData, updateBookData } from "../features/BookSlice";
import { deleteBorrowedBooks, postBorrowedBooks } from "../features/borrowedBooksSlice";
import { removeOverdueData } from "../features/overdueSlice";
import { removeRequestBooksData } from "../features/RequestBookSlice";
import { postRequestBookData } from "../features/RequestBookSlice";

// Context
import { BookContext } from "../context/BookContext";

function BookCard({ type = "library", data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleEdit, handleId } = useContext(BookContext);
  const { borrowedBooks, today, futureDate } = useSelector(
    (state) => state.borrowedBooks
  );
  const { login } = useSelector((state) => state.login);

  const isBorrowed = borrowedBooks.some(
    (book) => book.isbn === data.isbn && !book.returnDate
  );

  // Derive fallback status if not explicitly provided
  let derivedStatus;
  if (data.status) {
    derivedStatus = data.status; // take from API if exists (library books)
  } else if (isBorrowed) {
    derivedStatus = "Issued"; // book is borrowed
  } else {
    derivedStatus = "Available"; // book not borrowed and no status field
  }
  // Normalize book data (since "library" and "borrowed" differ in field names)
  const normalized = {
    id: data.id,
    bookId: data.bookId || data.id, // borrowedBooks have bookId
    title: data.title || data.bookTitle,
    author: data.author || data.bookAuthor,
    publisher: data.publisher,
    isbn: data.isbn,
    description: data.description,
    thumbnail: data.thumbnail || data.bookThumbnail,
    status: derivedStatus,
    // Borrower-specific
    memberId: data.memberId,
    memberName: data.memberName,
    memberImage: data.memberImage,
    borrowDate: data.borrowDate,
    dueDate: data.dueDate,
    returnDate: data.returnDate,
    totalDelayDays: data.totalDelayDays,
    totalFine: data.totalFine,
  };

  const {
    id,
    bookId,
    title,
    author,
    publisher,
    isbn,
    description,
    thumbnail,
    status,
    memberId,
    memberName,
    memberImage,
    borrowDate,
    dueDate,
    returnDate,
    totalDelayDays,
    totalFine,
  } = normalized;

  const newBorrowData = {
    id: crypto.randomUUID(),
    bookTitle: title,
    bookAuthor: author,
    bookId: bookId,
    memberName: memberName,
    memberId,
    borrowDate: today,
    dueDate: futureDate,
    returnDate: null,
    totalDelayDays: 0,
    fineRate: 2,
    totalFine: 0,
    isbn: isbn,
    bookThumbnail: thumbnail,
    memberImage: memberImage,
  };


  // Handle actions
  const handleDelete = () => {
    if (login.membershipType === "admin") {
      dispatch(removeBooksData(id));
    } else {
      navigate("/");
    }
  };

  const handleEditBook = () => {
    if (login.membershipType === "admin") {
      handleId(id);
      handleEdit(data);
      navigate("/addbook");
    } else {
      navigate("/");
    }
  };

  const reserve = () => {
    const requestData = {
      id: crypto.randomUUID(),
      bookId,
      bookTitle: title,
      bookAuthor: author,
      isbn,
      bookThumbnail: thumbnail,
      memberId: login.id,
      memberName: login.name,
      memberImage: login.userImage,
      requestDate: today, // keep tracking
    };

    // 1. Add to requestedBooks
    dispatch(postRequestBookData(requestData));
  };

  const handleReturn = () => {
    dispatch(
      updateBookData({
        id: bookId,
        updates: { status: "Available" },
      })
    );
    dispatch(deleteBorrowedBooks(id));
    dispatch(removeOverdueData(id));
  };

  const handleCancelRequest = () => {
    dispatch(removeRequestBooksData(id))
  }

  const handleApprove = () => {
    dispatch(postBorrowedBooks({ newBook: newBorrowData }))
    dispatch(removeRequestBooksData(id));
  }

  // Status for borrowed books
  const borrowedStatus = returnDate
    ? "Returned"
    : totalDelayDays > 0
      ? "Overdue"
      : "Borrowed";

  const statusColors = {
    Available: "bg-emerald-100 text-emerald-700",
    Issued: "bg-rose-100 text-rose-700",
    Pending: "bg-amber-100 text-amber-700",
    Borrowed: "bg-blue-100 text-blue-700",
    Overdue: "bg-red-100 text-red-700",
    Returned: "bg-green-100 text-green-700",
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col sm:flex-row">
      {/* Left - Thumbnail */}
      <div className="w-full sm:w-40 h-100 sm:h-56 flex-shrink-0">
        <img src={thumbnail} alt={title} className="w-full h-full object-contain" />
      </div>

      {/* Right - Info + Actions */}
      <div className="flex-1 flex flex-col justify-between p-4">
        {/* Book Info */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-600">by {author}</p>
          {publisher && <p className="text-xs text-slate-500 mt-1">Publisher: {publisher}</p>}

          {/* Description (library only) */}
          {description && type === "library" && (
            <p className="mt-2 text-sm text-slate-700 line-clamp-2">{description}</p>
          )}

          {/* Borrower Info (borrowed/overdue/requested) */}
          {(type === "borrowed" || type === "overdue" || type === "requested") && memberName && (
            <div className="flex items-center gap-2 mt-2">
              <img
                src={memberImage}
                alt={memberName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="text-sm font-medium text-zinc-700 truncate">
                {type === "requested" ? `Requested by ${memberName}` : memberName}
              </p>
            </div>
          )}

          {/* Dates & Fine */}
          {(type === "borrowed" || type === "overdue") && (
            <div className="mt-2 text-xs text-zinc-500 flex flex-wrap gap-2">
              <span>Borrowed: {borrowDate}</span>
              <span>Due: {dueDate}</span>
              {returnDate && <span>Returned: {returnDate}</span>}
              {totalDelayDays > 0 && (
                <span className="text-red-600 font-semibold">
                  Delay: {totalDelayDays}d · Fine: ${totalFine}
                </span>
              )}
            </div>
          )}

          {/* ISBN (library only) */}
          {isbn && type === "library" && (
            <div className="flex flex-wrap gap-2 mt-3">
              {Array.isArray(isbn) ? (
                isbn.map((num, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs"
                  >
                    ISBN: {num}
                  </span>
                ))
              ) : (
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                  ISBN: {isbn}
                </span>
              )}
            </div>
          )}

          {/* Status */}
          <span
            className={`inline-block mt-3 px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[type === "library" ? status : borrowedStatus]
              }`}
          >
            {type === "library" ? status : borrowedStatus}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          {/* Admin Actions */}
          {type === "library" && login.membershipType === "admin" && (
            <>
              <button
                onClick={handleEditBook}
                className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
              >
                Delete
              </button>
            </>
          )}

          {/* Reserve */}
          {type === "library" && login.membershipType !== "admin" && (
            <button
              disabled={status !== "Available"}
              onClick={() => reserve()}
              className={`w-full py-2 rounded-md text-sm font-medium ${status === "Available"
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
            >
              {status === "Available" ? "Reserve" : "Not Available"}
            </button>
          )}

          {/* Borrowed / Overdue */}
          {(type === "borrowed" || type === "overdue") && (
            <button
              onClick={handleReturn}
              disabled={!!returnDate || login.id !== memberId}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition ${!returnDate && login.id === memberId
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
            >
              {!returnDate
                ? login.id === memberId
                  ? "Mark Returned"
                  : "Not Your Book"
                : "Already Returned"}
            </button>
          )}

          {/* Requested */}
          {type === "requested" && (
            <>
              {login.membershipType === "admin" ? (
                // Admin actions
                <>
                  <button
                    onClick={() => handleApprove()}
                    disabled={status !== "Available"} // disable if book isn't available
                    className={`flex-1 py-2 rounded-md text-sm font-medium ${status === "Available"
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                  >
                    {status === "Available" ? "Approve" : "Not Available"}
                  </button>

                  <button
                    onClick={() => handleCancelRequest(id)}
                    className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
                  >
                    Reject
                  </button>
                </>
              ) : (
                // Member actions
                <button
                  onClick={() => handleCancelRequest()}
                  disabled={login.id !== memberId} // disable for other members
                  className={`flex-1 py-2 rounded-md text-sm font-medium ${login.id === memberId
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                >
                  {login.id === memberId ? "Cancel Request" : "Not Your Request"}
                </button>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
}

export default BookCard;
