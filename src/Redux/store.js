import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./Slice/DataSlice";


const store = configureStore({
    reducer: {
        dataList: dataReducer,
    }
})

export default store;