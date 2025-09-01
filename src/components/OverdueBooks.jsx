import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOverdueData } from "../features/overdueSlice"; // adjust path

function OverdueBooks() {
  const dispatch = useDispatch();
  const { overdueBooks } = useSelector((state) => state.overDue);

  // fetch overdue books on mount
  useEffect(() => {
    dispatch(fetchOverdueData());
  }, [dispatch]);

 

  return (
    <div>
      {overdueBooks.length ? (
        overdueBooks.map((book) => (
          <div key={book.id}>
           
            <h3>{book.bookTitle}</h3>
            <p>Author: {book.bookAuthor}</p>
            <p>Borrowed by: {book.memberName}</p>
            <p>Fine: ₹{book.totalFine} (Delayed {book.totalDelayDays} days)</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No overdue books found.</p>
      )}
    </div>
  );
}

export default OverdueBooks;



