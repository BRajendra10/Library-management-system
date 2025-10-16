import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const booksDataUrl = "https://lms-server-4hjh.onrender.com/books";

export const fetachedBooksData = createAsyncThunk(
  "fetchedBooksData",
  async () => {
    const res = await axios.get(booksDataUrl);
    return res.data;
  }
);

export const removeBooksData = createAsyncThunk("removeBooksData", async (id) => {
  await axios.delete(`${booksDataUrl}/${id}`);
  return id;
})

export const postBookData = createAsyncThunk("postBookData", async (newbookdata) => {
  const res = await axios.post(booksDataUrl, newbookdata)
  return res.data;
})

export const updateBookData = createAsyncThunk("updateBookData", async ({ id, updates }) => {
  const res = await axios.patch(`${booksDataUrl}/${id}`, updates);
  return res.data;
});

//InitialState
const initialState = {
  books: [],
  totalBooks: 0,
  status: "neutral",
  error: null,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // FETCH BOOKS
    builder.addCase(fetachedBooksData.pending, (state) => {
      state.status = " loading...";
    });

    builder.addCase(fetachedBooksData.fulfilled, (state, action) => {
      state.status = "success";
      state.books = action.payload;
      state.totalBooks = action.payload.length;
    });

    builder.addCase(fetachedBooksData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });

    // DELETE / REMOVE BOOK
    builder.addCase(removeBooksData.pending, (state) => {
      state.status = "loading"
    })

    builder.addCase(removeBooksData.fulfilled, (state, action) => {
      state.status = "success"
      state.books.filter(book => book.id !== action.payload);
    })


    builder.addCase(removeBooksData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });

    // POST NEW BOOK
    builder.addCase(postBookData.pending, (state) => {
      state.status = "loading";
    })

    builder.addCase(postBookData.fulfilled, (state, action) => {
      state.status = "success";
      state.books.push(action.payload);
    })

    builder.addCase(postBookData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });

    // UPDATE BOOK
    builder.addCase(updateBookData.pending, (state) => {
      state.status = " loading...";
    });

    builder.addCase(updateBookData.fulfilled, (state, action) => {
      state.status = "success";
      state.books = state.books.map((book) =>
        book.id === action.payload.id ? action.payload : book
      );
    });

    builder.addCase(updateBookData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });
  }
});

export default bookSlice.reducer;