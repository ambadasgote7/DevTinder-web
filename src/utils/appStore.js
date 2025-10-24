import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReduer from "./feedSlice";

const appStore = configureStore({
   reducer : {
      user : userReducer,
      feed : feedReduer,
   }, 
});

export default appStore;