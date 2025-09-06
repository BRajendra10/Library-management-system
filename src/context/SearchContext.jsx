import { createContext, useState } from "react";

export const SearchContext = createContext();

export function SearchContextProvider({children}) {
    const [searchBook, setSearchBook] = useState([]);
    const [searchMember, setSearchMember] = useState([]);

    const handleBook = (eliment) => setSearchBook(eliment);
    const handleMember = (eliment) => setSearchMember(eliment);

    return (
        <SearchContext.Provider value={{searchBook, searchMember, handleBook, handleMember}}>
            {children}
        </SearchContext.Provider>
    )
}