import React, { useContext } from 'react'
import { SearchContext } from '../context/SearchContext';
import { useSelector } from 'react-redux'
import Book from './Book'

function AllBooks() {
    const { searchBook } = useContext(SearchContext);
    const { books } = useSelector((state) => state.books);

    return (
        <div className="w-full h-fit flex flex-col gap-1">
            {searchBook.length >= 1 ? 
                searchBook.map((el, index) => <Book data={el} key={index} />) 
                : books.map((el, index) => <Book data={el} key={index} />)}
        </div>
    )
}

export default AllBooks