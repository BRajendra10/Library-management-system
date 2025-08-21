import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Json-data url
const booksDataUrl = "https://book-server-ahrs.onrender.com/books";

// books api fetched
export const fetachedBooksData = createAsyncThunk(
  "fetchedBooksData",
  async () => {
    const res = await axios.get(booksDataUrl);
    return res.data;
  }
);

// Delete books data from api
export const removeBooksData = createAsyncThunk("removeBooksData" , async (id)=> {
    const res = await axios.delete(`${booksDataUrl}/${id}`);
    return res.id;   
})

// Post new books data from api
export const postBookData = createAsyncThunk("postBookData" , async (newbookdata)=> {
    const res = await axios.post(booksDataUrl , newbookdata)
    return res.data;

})

//InitialState
const initialState = {
  books: [],
  status: "neutral",
  error: null,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    //Get api 
    builder.addCase(fetachedBooksData.pending, (state) => {
      state.status = " loading...";
    });

    builder.addCase(fetachedBooksData.fulfilled, (state, action) => {
      state.status = "success";
      state.books = action.payload;
    });

    builder.addCase(fetachedBooksData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });

    remove api 
    builder.addCase(removeBooksData.pending , (state ) => {
        state.status = "loading"
    })

    builder.addCase(removeBooksData.fulfilled , (state , action ) => {
        state.status = "success"
        state.books.splice(action.payload , 1);
    })


    builder.addCase(removeBooksData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });

    Post New book Data
     builder.addCase(postBookData.pending , (state ) => {
        state.status = "loading"
    })

    builder.addCase(postBookData.fulfilled , (state , action ) => {
        state.status = "success"
        state.books.push(action.payload);
    })


    builder.addCase(postBookData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });

  },
});

export default bookSlice.reducer;