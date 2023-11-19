'use client';

import { createSlice } from '@reduxjs/toolkit';
import { BannerRedux } from '../Feature';

const initialState:BannerRedux = []
export const BannerSlice = createSlice({
    name: "Banner",
    initialState:initialState,
    reducers:{
        addBanner:(state,action) => {
            let banner:BannerRedux = action.payload;
            banner.forEach((item) => {
                state.push({
                    image: item.image
                })
            })
        },
    },
})

export const { addBanner } = BannerSlice.actions;

export default BannerSlice.reducer;