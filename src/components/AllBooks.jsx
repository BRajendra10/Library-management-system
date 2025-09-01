import React from 'react'
import { useSelector } from 'react-redux'
import Book from './Book'

function AllBooks() {
    const { books } = useSelector((state) => state.books)
    return (
        <div className="w-full h-fit flex flex-col gap-1">
            {books?.length ? (
                books.map((el) => <Book data={el}  />)
            ) : (
                <p className="p-2 text-stone-500">No Books found.</p>
            )}
        </div>
    )
}

export default AllBooks