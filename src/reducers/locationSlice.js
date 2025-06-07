import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadLocationData = createAsyncThunk('location/loadData', async () => {
    const [cities, districts, wards] = await Promise.all([
        import('../data/cities.json'),
        import('../data/districts.json'),
        import('../data/wards.json'),
    ]);
    return {
        cities: cities.default,
        districts: districts.default,
        wards: wards.default,
    };
});

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        cities: [],
        districts: [],
        wards: [],
        loaded: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadLocationData.fulfilled, (state, action) => {
            state.cities = action.payload.cities;
            state.districts = action.payload.districts;
            state.wards = action.payload.wards;
            state.loaded = true;
        });
    },
});

export default locationSlice.reducer;
