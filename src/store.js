import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './reducers/locationSlice';
import formReducer from './reducers/formSlice';
import inquiriesReducer from './reducers/tableSlice';


export const store = configureStore({
    reducer: {
        location: locationReducer,
        form: formReducer,
        inquiries: inquiriesReducer,
    },
})

export default store;
