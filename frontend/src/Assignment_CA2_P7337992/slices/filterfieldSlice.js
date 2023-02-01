import { createSlice } from '@reduxjs/toolkit';
import React from 'react';


export const filterSlice = createSlice({
    name: 'filterSlice',
    initialState: {
        value: { date: "All", genre: "None", rating: 0, searchInput: "" } // All movies loaded initially
    },
    reducers: {
        filter: function (state, action) {
            state.value = action.payload;
        },
    },
});

// Use these to update the state in your component
export const { filter } = filterSlice.actions;

// This part goes into the store.
export default filterSlice.reducer;
