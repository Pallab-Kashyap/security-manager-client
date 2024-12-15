import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data } from "../../constants";

const initialState: Data[] = [

]

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers : {
        addData: (state,  action: PayloadAction<Data[]>) => {
            return [...state, ...action.payload];
        },
        updateDataContext: (state, action: PayloadAction<Data>) => {
            state = state.map(e => e._id === action.payload._id ? action.payload : e)
            return state
        },
        addOne: (state,  action: PayloadAction<Data>) => {
            console.log('state', state);
            state.unshift(action.payload);
            console.log(state);
        },
        deleteOne: (state, action: PayloadAction<string>) => {
            return state.filter(e => e._id !== action.payload);
        },
    }
})

export const {addData, updateDataContext, addOne, deleteOne} = dataSlice.actions
export default dataSlice.reducer
