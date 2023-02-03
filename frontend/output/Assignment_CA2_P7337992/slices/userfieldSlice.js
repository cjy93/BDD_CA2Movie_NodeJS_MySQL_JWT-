import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
export const userfieldSlice = createSlice({
  name: 'userfieldSlices',
  initialState: {
    value: {
      email: "",
      password: "",
      role: "",
      name: ""
    } // input field
  },

  reducers: {
    userfield: function (state, action) {
      state.value = action.payload;
    }
  }
});

// Use these to update the state in your component
export const {
  userfield
} = userfieldSlice.actions;

// This part goes into the store.
export default userfieldSlice.reducer;