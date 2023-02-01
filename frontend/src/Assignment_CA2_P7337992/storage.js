// storage.js
import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './slices/movieSlice';
import pageReducer from './slices/pageSlice';
import filterReducer from './slices/filterfieldSlice';
import addfieldsReducer from './slices/addFieldsSlice';
import pinReducer from './slices/pinSlice';
import updatefieldReducer from './slices/updatefieldSlice';
import userAccountReducer from './slices/userAccountSlice';
import userfieldsReducer from './slices/userfieldSlice';

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
        userfields: userfieldsReducer,



    }
})