import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    category: '',
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        addFilter: (state, action) => (state = action.payload),
        removeFilter: (state) => (state = initialState)
    }
})