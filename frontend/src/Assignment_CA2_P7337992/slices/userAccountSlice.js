import { createSlice } from '@reduxjs/toolkit';
import React from 'react';


export const userSlice = createSlice({
    name: 'userSlices',
    initialState: {
        value: [{
            username: "jiayi@gmail.com", password: "12345",
            role: "admin", name: "jiayi"
        }], // All users loaded initially
    },
    reducers: {
        addUser: function (state, action) {
            // To be used in "createAccount.jsx"
            // use `unshift` to push element to front of list
            state.value.push(
                {
                    email: action.payload.email,
                    password: action.payload.password,
                    role: action.payload.role,
                    name: action.payload.name
                });
        },

    },
});

// Use these to update the state in your component
export const { addUser } = userSlice.actions;

// This part goes into the store.
export default userSlice.reducer;
