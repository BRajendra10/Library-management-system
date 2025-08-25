import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//json data URL
const loginDataUrl = "https://book-server-ahrs.onrender.com/login";

// fetched Login user data api
export const loginUsersData = createAsyncThunk("loginUsersData", async () => {
  const res = await axios.get(loginDataUrl);
  return res.data;
});

export const updateLoginData = createAsyncThunk(
  "updateLoginData",
  async ({ id, updatedData }) => {
    const res = await axios.patch(`${loginDataUrl}/${id}`, updatedData);
    return res.data;
  }
);

// //post new users data
// export const postUsersData = createAsyncThunk(
//   "postUsersData",
//   async (newUserData) => {
//     const res = await axios.post(loginDataUrl, newUserData);
//     return res.data;
//   }
// );

// // Delete books data from api
// export const removeUsersData = createAsyncThunk(
//   "removeUsersData",
//   async (id) => {
//     const res = await axios.delete(`${loginDataUrl}/${id}`);
//     return res.id;
//   }
// );

const initialState = {
  login: [],
  isLogedIn: false,
  status: "neutral",
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setIsLogedIn: (state, action) => {
      state.isLogedIn = action.payload;
    }
  },
  extraReducers: (builder) => {
    // get api
    builder.addCase(loginUsersData.pending, (state) => {
      state.status = "loading...";
    });

    builder.addCase(loginUsersData.fulfilled, (state, action) => {
      state.status = "success";
      state.login = action.payload;
    });

    builder.addCase(loginUsersData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    // updating api
    builder.addCase(updateLoginData.pending, (state) => {
      state.status = "loading...";
    })

    builder.addCase(updateLoginData.fulfilled, (state, action) => {
      state.status = "success";
      state.login = action.payload;
    })

    builder.addCase(updateLoginData.rejected, (state, action) => {
      state.status = "error",
      state.error = action.error.message;
    })

    // //post new users data
    // builder.addCase(postUsersData.pending, (state) => {
    //   state.status = "loading...";
    // });

    // builder.addCase(postUsersData.fulfilled, (state, action) => {
    //   state.status = "success";
    //   state.login.push(action.payload);
    // });

    // builder.addCase(postUsersData.rejected, (state, action) => {
    //   (state.status = "error"), (state.error = action.error.message);
    // });

    // remove api
    // builder.addCase(removeUsersData.pending, (state) => {
    //   state.status = "loading";
    // });

    // builder.addCase(removeUsersData.fulfilled, (state, action) => {
    //   state.status = "success";
    //   state.login.splice(action.payload, 1);
    // });

    // builder.addCase(removeUsersData.rejected, (state, action) => {
    //   state.status = "error";
    //   state.error = action.error.message;
    // });
  },
});

export default loginSlice.reducer;
export const { setIsLogedIn } = loginSlice.actions;

// 1. Fetch user data from server (loginUsersData)
// 2. Post new user data (postUsersData) for registration
// 3. Delete user data (removeUsersData) - used here as logout functionality
//
// For testing:
// - Built a dummy form inside Login.jsx to add new users
// - Displayed the list of users using map()
// - Added a "Delete" button with each user to test the logout (delete) action
//
// ✅ Verified:
// - Data fetch is working correctly
// - Posting new user data is working correctly
// - Delete action is working correctly (removes user both from UI and server)
//
// Imported Login.jsx inside HelpSupport component for testing purpose
