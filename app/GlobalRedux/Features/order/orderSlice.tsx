import { createSlice } from '@reduxjs/toolkit';
import { OrderRedux, ProductRedux } from '../Feature';

const initialState: OrderRedux = {
    totalPrice: 0,
    totalProduct: 0,
    product: [],
};

export const OrderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        addOrder: (state, action) => {
            const product = action.payload;
            state.product = product.product; 
            state.totalPrice = product.totalPrice;
            state.totalProduct = product.totalProduct; 
        },
    },
});

export const { addOrder } = OrderSlice.actions;

export default OrderSlice.reducer;
