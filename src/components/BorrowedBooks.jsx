import React from 'react';
import { useSelector } from 'react-redux';
import BookCard from './BookCard';

function BorrowedBooks() {
  const { borrowedBooks } = useSelector((state) => state.borrowedBooks);

  return (
    <div className="w-full h-fit grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
      {borrowedBooks.length ? (
        borrowedBooks.map((el) => <BookCard type="borrowed" data={el} key={el.id} />)
      ) : (
        <p className="col-span-full text-center text-slate-500">
          No borrowed books founda.
        </p>
      )}
    </div>
  );
}

export default BorrowedBooks;
