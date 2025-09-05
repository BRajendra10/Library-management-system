import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: {},
    isLogedIn: false
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            const { values, members } = action.payload;
            const { email, password } = values;
            
            const data = members.filter((member) => member.email === email && member.password === password);

            state.login = data[0];
            state.isLogedIn = true;
        },

        resetLogin: (state) => {
            state.login = {};
            state.isLogedIn = false;
        }
    }
})

export default loginSlice.reducer;
export const { setLogin, resetLogin } = loginSlice.actions;