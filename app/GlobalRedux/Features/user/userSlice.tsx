'use client';

import { createSlice } from '@reduxjs/toolkit';
import { UserRedux } from '../Feature';

const initialState:UserRedux = {
    user_id:"",
    first_name:"",
    last_name:"",
    user_name:"",
    role:"",
    email:"",
    image:"",
}

export const UserSlice = createSlice({
    name: "user",
    initialState:initialState,
    reducers:{
        addUser:(state,action) => {
            let user:UserRedux = action.payload;
            state.user_id = user.user_id;
            state.first_name = user.first_name;
            state.last_name = user.last_name;
            state.user_name = user.user_name;
            state.email = user.email;
            state.role = user.role;
            state.image = user.image;
        },
        removeUser:(state, action) => {
            state = initialState;
        }
    },
    
})
export const { addUser, removeUser } = UserSlice.actions;

export default UserSlice.reducer;