import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
var genreidMap = {
  1: "Action",
  2: "Adventure",
  3: "Animation",
  4: "Comedy",
  5: "Crime",
  6: "Documentary",
  7: "Drama",
  8: "Fantasy",
  9: "Horror",
  10: "Mystery",
  11: "Romance",
  12: "Sci-Fi",
  13: "Sport"
};
export const movieSlice = createSlice({
  name: 'movieSlices',
  initialState: {
    value: [] // All movies loaded initially
  },

  reducers: {
    set: function (state, action) {
      // used in "ListMoviesPage.jsx"
      state.value = action.payload;
    },
    add: function (state, action) {
      // To be used in "MovieAdd.jsx"
      // action.payload will be the inputs from the input fields
      // Index for the new elements created by "Add" function. Users do not need to add index, the code will find the next empty integer via "nextId"
      // use `unshift` to push element to front of movie list
      state.value.push({
        movieID: action.payload.id,
        name: action.payload.title,
        imdb: action.payload.rating,
        GenreId: action.payload.genreId,
        Image_URL: action.payload.poster,
        links: action.payload.url,
        Release_Date: action.payload.release
      });
    },
    deleteOne: function (state, action) {
      // used in "MovieList.jsx"
      state.value.splice(action.payload, 1);
    },
    deleteMany: function (state, action) {
      // used in "MovieList.jsx"
      state.value.splice(action.payload, 1);
    },
    update: function (state, action) {
      // used in "MovieUpdate.jsx"
      // update only the chosen movie and replace that item with action.payload
      state.value.map(obj => {
        if (parseInt(obj.movieID) == action.payload.id) {
          obj.movieID = action.payload.id, obj.name = action.payload.title, obj.Active = action.payload.active, obj.imdb = action.payload.rating, obj.GenreId = action.payload.genreId, obj.Image_URL = action.payload.poster, obj.links = action.payload.url, obj.Release_Date = action.payload.release, obj.year = action.payload.year, obj.runtime = action.payload.runtime, obj.actor1 = action.payload.actor1, obj.actor2 = action.payload.actor2, obj.actor3 = action.payload.actor3, obj.actor4 = action.payload.actor4, obj.actor1_pic = action.payload.actor1_pic, obj.actor2_pic = action.payload.actor2_pic, obj.actor3_pic = action.payload.actor3_pic, obj.actor4_pic = action.payload.actor4_pic, obj.youtube = action.payload.youtube, obj.storyPlot = action.payload.storyPlot;
        }
      }); // note you cannot do `obj={xxx}` as it will not work. Need to define each element of obj and assign.
    }
  }
});

// Use these to update the state in your component
export const {
  set,
  add,
  deleteOne,
  deleteMany,
  update
} = movieSlice.actions;

// This part goes into the store.
export default movieSlice.reducer;