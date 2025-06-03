import { configureStore } from '@reduxjs/toolkit'
import moviceReducer from './reducers/moviceSlice'

export const store = configureStore({
    reducer: {
        movies: moviceReducer
    },
})