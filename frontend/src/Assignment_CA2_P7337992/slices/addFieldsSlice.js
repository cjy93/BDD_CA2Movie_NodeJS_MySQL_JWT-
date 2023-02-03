import { createSlice } from '@reduxjs/toolkit';
import React from 'react';


export const addfieldsSlice = createSlice({
    name: 'addfields',
    initialState: {
        value: {
            title: "",
            description: "",
            active: "",
            rating: 0,
            genreId: "",
            poster: "",
            url: "",
            release: ""
        } // All movies loaded initially
    },
    reducers: {
        addfields: function (state, action) {
            state.value = action.payload;
        },
    },
});

// Use these to update the state in your component
export const { addfields } = addfieldsSlice.actions;

// This part goes into the store.
export default addfieldsSlice.reducer;