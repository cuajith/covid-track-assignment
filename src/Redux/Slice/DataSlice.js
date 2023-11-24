import { createSlice } from "@reduxjs/toolkit";
import { ADD_DATA } from "../constant";

const initialState = {
  dataList: [],
};

const dataSlice = createSlice({
  name: "dataFetching",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ADD_DATA, (state, action) => {
      state.dataList = [...state.dataList, action.payload];
    });
  },
});

export const { extraReducers } = dataSlice.actions;
export default dataSlice.reducer;
