import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReduer from "./feedSlice";
import connectionReducer from "./connectionSlice";

const appStore = configureStore({
   reducer : {
      user : userReducer,
      feed : feedReduer,
      connections : connectionReducer,
   }, 
});

export default appStore;