import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
    try {
        const raw = localStorage.getItem('formData');
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
};

const saveToLocalStorage = (data) => {
    try {
        localStorage.setItem('formData', JSON.stringify(data));
    } catch {
    }
};

const formSlice = createSlice({
    name: 'form',
    initialState: {
        data: loadFromLocalStorage(),
    },
    reducers: {
        saveFormData(state, action) {
            state.data = action.payload;
            saveToLocalStorage(state.data);
        },
        resetFormData(state) {
            state.data = {};
            saveToLocalStorage({});
        },
    },
});

export const { saveFormData, resetFormData } = formSlice.actions;
export default formSlice.reducer;
