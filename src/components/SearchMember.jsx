import { SearchContext } from '../context/SearchContext';
import { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { GrSearch } from 'react-icons/gr';
import { RxCross2 } from 'react-icons/rx';

export default function SearchBar() {
    const { handleMember } = useContext(SearchContext);
    const { members } = useSelector((state) => state.members);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 0) {
            const filteredMembers = members.filter((m) =>
                m.name.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filteredMembers);
            handleMember(filteredMembers);
        } else {
            setResults([]);
            handleMember([]);
        }
    };

    const clearSearch = () => {
        setQuery('');
        setResults([]);
        handleMember([]);
    };

    return (
        <div className="relative min-w-[15rem] w-[30rem]">
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
                    placeholder="Search members by name"
                />
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
                                handleMember([member])
                            }}
                        >
                            <div className="flex flex-col">
                                <span className="font-medium">{member.name}</span>
                                <span className="text-stone-500 text-sm">Email: {member.email}</span>
                                <span className="text-stone-500 text-sm">Department: {member.department}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}