import { SearchContext } from '../context/SearchContext';
import { useState, useContext } from 'react'
import { useSelector } from 'react-redux';
import { GrSearch } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";

export default function SearchBar() {
    const { handleBook } = useContext(SearchContext);
    const { books } = useSelector((state) => state.books);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 0) {
            const filtered = books.filter(
                (b) =>
                    b.title.toLowerCase().includes(value.toLowerCase()) ||
                    b.author.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filtered);
            handleBook(filtered);
        } else {
            setResults([]);
            handleBook([]);
        }
    };

    const clearSearch = () => {
        setQuery("");
        setResults([]);
        handleBook([]);
    };

    return (
        <div className="relative min-w-[15rem] w-[35rem]">
            {/* Search Box */}
            <div className="h-11 flex items-center border border-blue-200 rounded-sm">
                <div className="w-10 h-full flex justify-center items-center">
                    {query ? (
                        <RxCross2
                            className="text-lg text-stone-950 cursor-pointer"
                            onClick={clearSearch}
                        />
                    ) : (
                        <GrSearch className="text-lg text-stone-500" />
                    )}
                </div>
                <input
                    className="flex-1 h-full py-1 px-2 outline-none"
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search books, author, members etc."
                />
            </div>

            {/* Dropdown */}
            {results.length > 0 && (
                <ul className="absolute top-12 left-0 w-full bg-white border border-blue-200 rounded-sm shadow-lg max-h-60 overflow-y-auto z-10">
                    {results.map((book) => (
                        <li
                            key={book.id}
                            className="px-3 py-2 hover:bg-blue-50 cursor-pointer"
                            onClick={() => {
                                setQuery(book.title);
                                setResults([]);
                                handleBook([book]);
                            }}
                        >
                            <span className="font-medium">{book.title}</span>{" "}
                            <span className="text-stone-500 text-sm">by {book.author}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}