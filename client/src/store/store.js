import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice";

const store = configureStore({
    reducer : {
        User : userSlice,
    }
})

export default store;