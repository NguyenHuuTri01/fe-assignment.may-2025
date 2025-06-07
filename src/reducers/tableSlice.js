import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
    try {
        const stored = localStorage.getItem('inquiriesState');
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
};

const saveState = (state) => {
    try {
        localStorage.setItem('inquiriesState', JSON.stringify(state));
    } catch { }
};

const initialState = {
    sortBy: null,
    sortOrder: 'asc',
    filters: {},
    currentPage: 1,
    pageSize: 10,
    ...loadState(),
};

const inquiriesTableSlice = createSlice({
    name: 'inquiries',
    initialState,
    reducers: {
        updateState(state, action) {
            Object.assign(state, action.payload);
            saveState(state);
        },
        resetState(state) {
            Object.assign(state, initialState);
            saveState(initialState);
        },
    },
});

export const { updateState, resetState } = inquiriesTableSlice.actions;
export default inquiriesTableSlice.reducer;
