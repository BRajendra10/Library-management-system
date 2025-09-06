import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Book from './Book'

function BorrowedBooks() {
  const { books } = useSelector((state) => state.books)
  const { borrowedBooks } = useSelector((state) => state.borrowedBooks);
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const data = books.filter((book) => 
      borrowedBooks.find((el) => {
        if(el.bookId == book.id) return el;
      })
    )

    setBookData(data);
  }, [books, borrowedBooks])

  return (
    <div className="w-full h-fit flex flex-col gap-1">
      {bookData?.length ? (
        bookData.map((el, index) => <Book data={el} key={index} />)
      ) : (
        <p className="p-2 text-stone-500">No Books found.</p>
      )}
    </div>
  )
}

export default BorrowedBooks