import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
export const pageSlice = createSlice({
  name: 'pageSlices',
  initialState: {
    value: false // All movies loaded initially
  },

  reducers: {
    login: function (state, action) {
      state.value = !action.payload;
    }
  }
});

// Use these to update the state in your component
export const {
  login
} = pageSlice.actions;

// This part goes into the store.
export default pageSlice.reducer;