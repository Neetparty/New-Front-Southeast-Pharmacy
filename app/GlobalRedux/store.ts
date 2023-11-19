'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Features/counter/counterSlice';
import userReducer from './Features/user/userSlice';
import orderReducer from './Features/order/orderSlice';
import categoryReducer from './Features/category/categorySlice';
import bannerReducer from './Features/banner/bannerSlice';
import langReducer from './Features/lang/langSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user:userReducer,
        order:orderReducer,
        category: categoryReducer,
        banner: bannerReducer,
        lang: langReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;