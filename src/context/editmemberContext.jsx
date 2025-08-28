import { createContext, useState } from "react";

export const MemberContext = createContext();

export function MemberContextProvider({ children }) {
    const [editedMember, setEditedMember] = useState({});
    const [memberId, setMemberId] = useState(null);

    const handleEdit = (obj) => setEditedMember(obj);
    const handleId = (el) => setMemberId(el);

    return <MemberContext.Provider value={{ editedMember, handleEdit, memberId, handleId }}>
        {children}
    </MemberContext.Provider>
}