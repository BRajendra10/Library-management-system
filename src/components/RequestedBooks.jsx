import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetachedRequestBooksData } from "../features/RequestBookSlice"; // adjust path

function RequestedBooks() {
  const dispatch = useDispatch();
  const { requestbooks} = useSelector((state) => state.requestbooks);

  // fetch request books on mount
  useEffect(() => {
    dispatch(fetachedRequestBooksData());
  }, [dispatch]);

  

  return (
    <div>
      {requestbooks.length ? (
        requestbooks.map((req) => (
          <div key={req.id}>
            <h3>{req.bookTitle}</h3>
            <p>Author: {req.bookAuthor}</p>
            <p>Requested by: {req.memberName}</p>
            <p>Request Date: {req.requestDate}</p>
            <p>Queue Position: {req.queuePosition}</p>
            <img src={req.bookThumbnail} alt={req.bookTitle} width="80" />
            <hr />
          </div>
        ))
      ) : (
        <p>No requested books found.</p>
      )}
    </div>
  );
}

export default RequestedBooks;
