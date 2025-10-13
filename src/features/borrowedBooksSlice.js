import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const borrowedBooksURL = "https://lms-server-4hjh.onrender.com/borrowedBooks";

export const fetchBorrowedBook = createAsyncThunk("borrowedBooks/fetchBorrowedBook", async () => {
  const res = await axios.get(borrowedBooksURL);
  return res.data;
});

export const postBorrowedBooks = createAsyncThunk("borrowedBooks/postBorrowedBooks", async ({ newBook }) => {
  const res = await axios.post(borrowedBooksURL, newBook);
  return res.data;
});

export const deleteBorrowedBooks = createAsyncThunk("deleteBorrowedBooks", async (id) => {
  await axios.delete(`${borrowedBooksURL}/${id}`);
  return id;
})

const initialState = {
  borrowedBooks: [],
  status: "neutral",
  error: null,
  today: 0,
  futureDate: 0,
};

const borrowedBooksSlice = createSlice({
  name: "borrowedBooks",
  initialState,
  reducers: {
    getDate: (state) => {
      const date = new Date();
      let futureDate = new Date(date);
      futureDate.setDate(date.getDate() + 15);
      state.today = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-');
      state.futureDate = futureDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBorrowedBook.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchBorrowedBook.fulfilled, (state, action) => {
        state.status = "success";
        state.borrowedBooks = action.payload;
      })

      .addCase(fetchBorrowedBook.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      .addCase(postBorrowedBooks.pending, (state) => {
        state.status = "loading";
      })

      .addCase(postBorrowedBooks.fulfilled, (state, action) => {
        state.status = "success";
        state.borrowedBooks.push(action.payload);
      })

      .addCase(postBorrowedBooks.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      .addCase(deleteBorrowedBooks.pending, (state) => {
        state.status = "loading";
      })

      .addCase(deleteBorrowedBooks.fulfilled, (state, action) => {
        state.status = "success";
        state.borrowedBooks = state.borrowedBooks.filter(book => book.id !== action.payload);
      })

      .addCase(deleteBorrowedBooks.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
  }
});

export default borrowedBooksSlice.reducer;
export const { getDate } = borrowedBooksSlice.actions;