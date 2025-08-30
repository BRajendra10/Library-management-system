import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const borrowedBooksURL = "https://book-server-ahrs.onrender.com/borrowedBooks";

export const fetchBorrowedBook = createAsyncThunk("fetchBorrowedBook", async () => {
    const res = await axios.get(borrowedBooksURL);
    return res.data;
})

const initialState = {
    borrowedBooks: [],
    status: "neutral",
    error: null,
    today: 0,
    futureDate: 0,
}

const boorowedBookSlice = createSlice({
    name: "borrowedBooks",
    initialState,
    reducers: {
        getDate: (state) => {
            const date = new Date();
            let futureDate = new Date(date);
            futureDate.setDate(date.getDate() + 15);
            futureDate = futureDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-')
            state.today = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-');
            state.futureDate = futureDate;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBorrowedBook.pending, (state) => {
            state.status = "loading...";
        });

        builder.addCase(fetchBorrowedBook.fulfilled, (state, action) => {
            state.status = "success";
            state.borrowedBooks = action.payload;
        });

        builder.addCase(fetchBorrowedBook.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload.error;
        });
    }
})

export default boorowedBookSlice.reducer;
export const { getDate } = boorowedBookSlice.actions;