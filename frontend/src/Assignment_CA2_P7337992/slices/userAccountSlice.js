import { createSlice } from '@reduxjs/toolkit';
import React from 'react';


export const userSlice = createSlice({
    name: 'userSlices',
    initialState: {
        value: [{ username: "jy", password: "123" }], // All users loaded initially
    },
    reducers: {
        addUser: function (state, action) {
            // To be used in "createAccount.jsx"
            // use `unshift` to push element to front of list
            state.value.unshift(
                {
                    username: action.payload.username,
                    password: action.payload.password
                });
        },

    },
});

// Use these to update the state in your component
export const { addUser } = userSlice.actions;

// This part goes into the store.
export default userSlice.reducer;
