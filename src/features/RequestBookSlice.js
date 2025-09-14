import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Json-data url
const requestbooksDataUrl = "https://book-server-ahrs.onrender.com/requestedBooks";

// request books api fetched
export const fetachedRequestBooksData = createAsyncThunk(
  "fetachedRequestBooksData",
  async () => {
    const res = await axios.get(requestbooksDataUrl);
    return res.data;
  }
);

// Delete request books data from api
export const removeRequestBooksData = createAsyncThunk("removeRequestBooksData", async (id) => {
  await axios.delete(`${requestbooksDataUrl}/${id}`);
  return id;
})

// Post new books data from api
export const postRequestBookData = createAsyncThunk("postRequestBookData", async (newRequestbookdata) => {
  const res = await axios.post(requestbooksDataUrl, newRequestbookdata)
  return res.data;

})

//InitialState
const initialState = {
  requestbooks: [],
  status: "neutral",
  error: null,
};

const requestBookSlice = createSlice({
  name: "requestbooks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Get api 
    builder.addCase(fetachedRequestBooksData.pending, (state) => {
      state.status = " loading...";
    });

    builder.addCase(fetachedRequestBooksData.fulfilled, (state, action) => {
      state.status = "success";
      state.requestbooks = action.payload;
    });

    builder.addCase(fetachedRequestBooksData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });

    // remove api 
    builder.addCase(removeRequestBooksData.pending, (state) => {
      state.status = "loading"
    })

    builder.addCase(removeRequestBooksData.fulfilled, (state, action) => {
      state.status = "success";
      state.requestbooks = state.requestbooks.filter(
        (book) => book.id !== action.payload
      );
    });

    builder.addCase(removeRequestBooksData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });

    // Post New book Data
    builder.addCase(postRequestBookData.pending, (state) => {
      state.status = "loading"
    })

    builder.addCase(postRequestBookData.fulfilled, (state, action) => {
      state.status = "success"
      state.requestbooks.push(action.payload);
    })

    builder.addCase(postRequestBookData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });
  }
});

export default requestBookSlice.reducer;