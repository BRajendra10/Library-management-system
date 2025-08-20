import { configureStore } from "@reduxjs/toolkit";
import bookReducer from '../features/BookSlice'
import membersReducer from '../features/MemberSlice'

export const store = configureStore({
    reducer  : {
        books : bookReducer,
        members : membersReducer
    }
})