import { ADD_DATA } from "../constant";

export const addData = (data) => ({
    type: ADD_DATA,
    payload: data
})