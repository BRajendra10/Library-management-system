import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const overdueURL = "https://book-server-ahrs.onrender.com/overdueBooks";

export const fetchOverdueData = createAsyncThunk("fetchOverdueData", async () => {
    const res = await axios.get(overdueURL);
    return res.data;
})

export const removeOverdueData = createAsyncThunk("removeOverdueData", async (id) => {
    await axios.delete(`${overdueURL}/${id}`);
    return id;
})

const initialState = {
    overdueBooks: [],
    "Fine": 0,
    statue: "neutral",
    error: null
};

const overdueSlice = createSlice({
    name: "overdueBooks",
    initialState,
    reducers: {
        setTotalFine: (state, action) => {
            action.payload.filter((el) => state.Fine += el.totalFine);
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchOverdueData.pending, (state) => {
            state.status = "loading...";
        });

        builder.addCase(fetchOverdueData.fulfilled, (state, action) => {
            state.status = "success";
            state.overdueBooks = action.payload;
        })

        builder.addCase(fetchOverdueData.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload.error;
        });

        builder.addCase(removeOverdueData.pending, (state) => {
            state.status = "loading...";
        });

        builder.addCase(removeOverdueData.fulfilled, (state, action) => {
            state.status = "success";
            state.overdueBooks.filter(due => due.id !== action.payload);
        })

        builder.addCase(removeOverdueData.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload.error;
        });
    }
})

export default overdueSlice.reducer;
export const { setTotalFine } = overdueSlice.actions;