import { createSlice } from '@reduxjs/toolkit';
import React from 'react';


export const pinSlice = createSlice({
    name: 'pinSlices',
    initialState: {
        value: [], // All movies loaded initially
    },
    reducers: {
        pin: function (state, action) {
            let pinId = action.payload.id
            // Only add to "pinned" list if not already in list. Max pin up to 5 movies
            if (!state.value.includes(parseInt(pinId)) && state.value.length <= 4) {
                state.value.unshift(
                    parseInt(action.payload.id)
                );
            }
        },
        unpin: function (state, action) {
            let pinId = action.payload.id
            // Only add to "pinned" list if not already in list
            if (state.value.includes(parseInt(pinId))) {
                state.value = state.value.filter(e => e != pinId);
            }
        },
    },
});

// Use these to update the state in your component
export const { pin, unpin } = pinSlice.actions;

// This part goes into the store.
export default pinSlice.reducer;
