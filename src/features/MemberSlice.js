import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Members data url
const memberDataUrl = "https://lms-server-4hjh.onrender.com/members";

//members api data Fetched
export const fetchedMembersData = createAsyncThunk(
  "fetchedMembersData",
  async () => {
    const res = await axios.get(memberDataUrl);
    return res.data;
  }
);

export const postMemberData = createAsyncThunk("postMemberData", async ({ newMember }) => {
  const res = await axios.post(`${memberDataUrl}`, newMember);
  return res.data;
})

export const delteMember = createAsyncThunk("delteMember", async (id) => {
  await axios.delete(`${memberDataUrl}/${id}`);
  return id;
})

export const updateMemberData = createAsyncThunk("updateMemberData", async ({ updatedMember, id }) => {
  const res = await axios.put(`${memberDataUrl}/${id}`, updatedMember);
  return res.data;
})

//initial State
const initialState = {
  members: [],
  admin: [],
  totalMembers: 0,
  status: "neutral",
  error: null,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload?.filter((member) => member.membershipType === 'admin') || [];
    }
  },
  extraReducers: (builder) => {
    //Get api data

    builder.addCase(fetchedMembersData.pending, (state) => {
      state.status = "loading...";
    });

    builder.addCase(fetchedMembersData.fulfilled, (state, action) => {
      state.status = "success";
      state.members = action.payload;
      state.totalMembers = action.payload.length;
    });

    builder.addCase(fetchedMembersData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });

    builder.addCase(postMemberData.pending, (state) => {
      state.status = "loading...";
    });

    builder.addCase(postMemberData.fulfilled, (state, action) => {
      state.status = "success";
      state.members.push(action.payload);
    });

    builder.addCase(postMemberData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(delteMember.pending, (state) => {
      state.status = "loading...";
    })

    builder.addCase(delteMember.fulfilled, (state, action) => {
      state.status = "success";
      state.members = state.members.filter(member => member.id !== action.payload);
    });

    builder.addCase(delteMember.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    })

    builder.addCase(updateMemberData.pending, (state) => {
      state.status = "loading...";
    })

    builder.addCase(updateMemberData.fulfilled, (state, action) => {
      state.status = "success";
      state.members = state.members.map(member =>
        member.id === action.payload.id ? action.payload : member
      );
    });

    builder.addCase(updateMemberData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    })
  },
});


export default memberSlice.reducer;
export const { setAdmin } = memberSlice.actions;