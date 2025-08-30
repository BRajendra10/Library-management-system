import { configureStore } from "@reduxjs/toolkit";
import bookReducer from '../features/BookSlice'
import membersReducer from '../features/MemberSlice'
import loginReducer from '../features/LoginSlice'
import overdueSlice from "../features/overdueSlice";
import requestBooksReducer from "../features/RequestBookSlice"
import boorowedBookReducer from "../features/borrowedBooksSlice";

export const store = configureStore({
    reducer  : {
        books : bookReducer,
        members : membersReducer,
        login : loginReducer,
        overDue: overdueSlice,
        requestbooks : requestBooksReducer,
        borrowedBooks: boorowedBookReducer
    }
})