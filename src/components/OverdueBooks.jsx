import React from 'react';
import { useSelector } from 'react-redux';
import BookCard from './BookCard';

function OverdueBooks() {
  const { overdueBooks } = useSelector((state) => state.overDue);

  return (
    <div className="w-full h-fit grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
      {overdueBooks.length ? (
        overdueBooks.map((el) => <BookCard type="overdue" data={el} key={el.id} />)
      ) : (
        <p className="col-span-full text-center text-slate-500">
          No overdue books found.
        </p>
      )}
    </div>
  );
}

export default OverdueBooks;
