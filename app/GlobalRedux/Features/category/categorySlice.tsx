'use client';

import { createSlice } from '@reduxjs/toolkit';
import { CategoryRedux } from '../Feature';

const initialState:CategoryRedux = []
export const CategorySlice = createSlice({
    name: "category",
    initialState:initialState,
    reducers:{
        addCategory:(state,action) => {
            let user:CategoryRedux = action.payload;
            user.forEach((item) => {
                state.push({
                    category_id : item.category_id,
                    category_name: item.category_name,
                    category_name_ch: item.category_name_ch,
                    category_name_en: item.category_name_en
                })
            })
        },
    },
})

export const { addCategory } = CategorySlice.actions;

export default CategorySlice.reducer;