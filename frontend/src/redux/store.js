import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";
import socketReducer from "./socketSlice.js";
const rootReducer = combineReducers({
    user: userReducer,
    message: messageReducer,
    socket:socketReducer

});

const store = configureStore({
    reducer: rootReducer,
    // Add middleware or other store configuration if needed
});

export default store;
