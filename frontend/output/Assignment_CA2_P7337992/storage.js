// storage.js
import { configureStore } from '@reduxjs/toolkit';
import movieReducer from "./slices/movieSlice.js";
import pageReducer from "./slices/pageSlice.js";
import filterReducer from "./slices/filterfieldSlice.js";
import addfieldsReducer from "./slices/addFieldsSlice.js";
import pinReducer from "./slices/pinSlice.js";
import updatefieldReducer from "./slices/updatefieldSlice.js";
import userAccountReducer from "./slices/userAccountSlice.js";
import userfieldsReducer from "./slices/userfieldSlice.js";
export default configureStore({
  reducer: {
    // Register reducers here
    record: movieReducer,
    page: pageReducer,
    filter: filterReducer,
    addfields: addfieldsReducer,
    pin: pinReducer,
    updatefield: updatefieldReducer,
    userList: userAccountReducer,
    userfields: userfieldsReducer
  }
});