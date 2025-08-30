import React, { useContext } from "react";
import { useSelector } from 'react-redux'
import { useState } from "react";
import { GrSearch } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { LendingBookContext } from '../context/LendingBookContext';

export function SearchLendingMember() {
    const { borrowedBooks } = useSelector((state) => state.borrowedBooks);
    const {setMemberResults} = useContext(LendingBookContext);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 0) {
            const filteredMembers = borrowedBooks.filter((m) =>
                m.memberName.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filteredMembers);
            setMemberResults(filteredMembers);
        } else {
            setResults([]);
        }
    };

    const clearSearch = () => {
        setQuery('');
        setResults([]);
        setMemberResults([]);
    };

    return (
        <div className="relative max-w-full my-1">
            {/* Search Box */}
            <div className="h-11 flex items-center border border-blue-200 rounded-sm">
                <input
                    className="flex-1 h-full py-1 px-2 outline-none"
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search members by name"
                />
                {query && <div className="w-10 h-full flex justify-center items-center">
                    <RxCross2
                        className="text-lg text-stone-950 cursor-pointer"
                        onClick={clearSearch}
                    />
                </div>}
            </div>

            {/* Dropdown */}
            {results.length > 0 && (
                <ul className="absolute top-12 left-0 w-full bg-white border border-blue-200 rounded-sm shadow-lg max-h-60 overflow-y-auto z-10">
                    {results.map((member) => (
                        <li
                            key={member.id}
                            className="px-3 py-2 hover:bg-blue-50 cursor-pointer"
                            onClick={() => {
                                setQuery(member.name);
                                setResults([]);
                            }}
                        >
                            <div className="flex flex-col">
                                <span className="font-medium">{member.memberName}</span>
                                <span className="text-stone-500 text-sm">Book name: {member.bookTitle}</span>
                                <span className="text-stone-500 text-sm">Book author: {member.bookAuthor}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}