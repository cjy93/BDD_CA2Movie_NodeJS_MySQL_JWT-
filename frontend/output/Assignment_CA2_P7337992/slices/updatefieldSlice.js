import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
export const updatefieldSlice = createSlice({
  name: 'updatefieldSlice',
  initialState: {
    value: {
      // Main Menu for inputs
      // Variable names follow what will be displayed at frontend
      id: "",
      title: "",
      rating: "",
      genres: "",
      poster: "",
      url: "",
      release: "",
      // The optionals (dropdown menu for updates)
      runtime: "",
      storyplot: "",
      actor1: "",
      actor2: "",
      actor3: "",
      actor4: "",
      actor1_as: "",
      actor2_as: "",
      actor3_as: "",
      actor4_as: "",
      actor1_link: "",
      actor2_link: "",
      actor3_link: "",
      actor4_link: "",
      actor1_pic: "",
      actor2_pic: "",
      actor3_pic: "",
      actor4_pic: "",
      youtube: "",
      plot: ""
    } // initial parameters
  },

  reducers: {
    updatefield: function (state, action) {
      state.value = action.payload;
    }
  }
});

// Use these to update the state in your component

export const {
  updatefield
} = updatefieldSlice.actions;

// This part goes into the store.
export default updatefieldSlice.reducer;