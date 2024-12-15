import { createSlice } from "@reduxjs/toolkit";

interface User {
    username: string | null
}

const initialState: User = { username: null }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers : {
        addUser: (state, action) => {
            console.log(action.payload);
            state.username = action.payload
        }
    }
})

export const {addUser} = userSlice.actions

export default userSlice.reducer
