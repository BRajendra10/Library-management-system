import React, { useContext } from 'react'
import { SearchContext } from '../context/SearchContext';
import { useSelector } from 'react-redux'
import BookCard from './BookCard';

function AllBooks() {
    const { searchBook } = useContext(SearchContext);
    const { books } = useSelector((state) => state.books);

    return (
        <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-2 sm:p-4">
            {searchBook?.length >= 1 ? (
                searchBook.map((el, index) => <BookCard type="library" data={el} key={index} />)
            ) : books.length > 0 ? (
                books.map((el, index) => <BookCard type="library" data={el} key={index} />)
            ) : (
                <p className="col-span-full text-center text-slate-500">No books found.</p>
            )}
        </div>
    )
}

export default AllBooks