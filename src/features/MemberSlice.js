import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Members data url
const memberDataUrl = "https://book-server-ahrs.onrender.com/members";

//members api data Fetched
export const fetchedMembersData = createAsyncThunk(
  "fetchedMembersData",
  async () => {
    const res = await axios.get(memberDataUrl);
    return res.data;
  }
);

//initial State
const initialState = {
  members: [],
  status: "neutral",
  error: null,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Get api data

    builder.addCase(fetchedMembersData.pending, (state) => {
      state.status = "loading...";
    });

    builder.addCase(fetchedMembersData.fulfilled, (state, action) => {
      state.status = "success";
      state.members = action.payload;
    });

    builder.addCase(fetchedMembersData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });
  },
});


export default memberSlice.reducer;


//  Redux slice for members
// - Fetching books data from API
// - Integrated in Overview component