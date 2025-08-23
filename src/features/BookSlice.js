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
export const removeBooksData = createAsyncThunk("removeBooksData", async (id) => {
  await axios.delete(`${booksDataUrl}/${id}`);
  return id;
})

// Post new books data from api
export const postBookData = createAsyncThunk("postBookData", async (newbookdata) => {
  const res = await axios.post(booksDataUrl, newbookdata)
  return res.data;

})

//InitialState
const initialState = {
  books: [],
  overdueBooks: [],
  overdueDetails: [],
  status: "neutral",
  error: null,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setOverdueDetails: (state, action) => {
      const { books, members } = action.payload;
      const today = new Date().toISOString().split("T")[0];
      state.overdueDetails = [];

      const overdueData = books.filter((book) => {
        return book?.borrowDetails?.some((el) => el.dueDate < today);
      });

      overdueData.map((book) => {
        const borrowInfo = book.borrowDetails.find((el) => el.dueDate < today);
        const member = members.find((m) => m.id === borrowInfo.userId);

        const due = borrowInfo.dueDate;
        const diffTime = parseInt(today.slice(-2)) - parseInt(due.slice(-2));
        const fine = diffTime * 10;

        state.overdueDetails.push({
          bookId: book.id,
          title: book.title,
          author: book.author,
          cover: book.thumbnail,
          memberId: member?.id,
          memberName: member?.name,
          memberEmail: member?.email,
          memberImage: member?.userImage,
          dueDate: borrowInfo.dueDate,
          overdueDays: diffTime,
          fine,
        })
      });
    }
  },
  extraReducers: (builder) => {
    //Get api 
    builder.addCase(fetachedBooksData.pending, (state) => {
      state.status = " loading...";
    });

    builder.addCase(fetachedBooksData.fulfilled, (state, action) => {
      state.status = "success";
      state.books = action.payload;

      const today = new Date().toISOString().split("T")[0];
      state.overdueBooks = action.payload.filter((book) => {
        return book?.borrowDetails?.some((el) => el.dueDate < today);
      });
    });

    builder.addCase(fetachedBooksData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });

    // remove api 
    builder.addCase(removeBooksData.pending, (state) => {
      state.status = "loading"
    })

    builder.addCase(removeBooksData.fulfilled, (state, action) => {
      state.status = "success"
      state.books.splice(action.payload, 1);
    })


    builder.addCase(removeBooksData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });

    // Post New book Data
    builder.addCase(postBookData.pending, (state) => {
      state.status = "loading"
    })

    builder.addCase(postBookData.fulfilled, (state, action) => {
      state.status = "success"
      state.books.push(action.payload);
    })


    builder.addCase(postBookData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });
  }
});

export default bookSlice.reducer;
export const { setOverdueDetails } = bookSlice.actions;