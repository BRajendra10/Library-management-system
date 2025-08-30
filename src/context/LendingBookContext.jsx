import { createContext, useState } from "react";

export const LendingBookContext = createContext();

export function LendingBookContextProvider({children}) {
    const [bookResults, setBookResults] = useState([]);
    const [memberResults, setMemberResults] = useState([]);

    return <LendingBookContext.Provider value={{bookResults, setBookResults, memberResults, setMemberResults}}>
        {children}
    </LendingBookContext.Provider>
}