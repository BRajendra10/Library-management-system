import React from 'react';
import { useSelector } from 'react-redux';
import BookCard from './BookCard';

function RequestedBooks() {
  const { requestbooks } = useSelector((state) => state.requestbooks);

  return (
    <div className="w-full h-fit grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
      {requestbooks.length ? (
        requestbooks.map((el) => <BookCard type="requested" data={el} key={el.id} />)
      ) : (
        <p className="col-span-full text-center text-slate-500">
          No requested books found.
        </p>
      )}
    </div>
  );
}

export default RequestedBooks;
