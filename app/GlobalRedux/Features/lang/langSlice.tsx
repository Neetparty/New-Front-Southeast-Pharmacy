'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState:{lang:"th" | "en" | "cn" | string} = {
    lang: "th"
}

export const LangSlice = createSlice({
    name: "Lang",
    initialState:initialState,
    reducers:{
        addLang:(state,action) => {
            state.lang = action.payload;            
        },
        removeLang:(state, action) => {
            state.lang = "th";
        }
    },
    
})
export const { addLang, removeLang } = LangSlice.actions;

export default LangSlice.reducer;