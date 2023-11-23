'use client';

import { createSlice } from '@reduxjs/toolkit';
import { CategoryRedux } from '../Feature';

const initialState:CategoryRedux = []
export const CategorySlice = createSlice({
    name: "category",
    initialState:initialState,
    reducers:{
        addCategory: (state, action) => (state = [...action.payload]),
        removeCategory: () => initialState
    },
})

export const { addCategory } = CategorySlice.actions;

export default CategorySlice.reducer;