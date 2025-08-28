import { createContext, useState } from "react";

export const BookContext = createContext();

export function BookContextProvider({ children }) {
  const [editedBook, setEditedBook] = useState({});
  const [bookId, setBookId] = useState(null);

  const handleEdit = (obj) => setEditedBook(obj);
  const handleId = (id) => setBookId(id);

  return (
    <BookContext.Provider value={{ editedBook, handleEdit, bookId, handleId }}>
      {children}
    </BookContext.Provider>
  );
}
