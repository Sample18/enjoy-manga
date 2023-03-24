import { createSlice } from "@reduxjs/toolkit";
import genresService from "../services/genres.service";

const genresSlice = createSlice({
    name: "genres",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        genresRequested: (state) => {
            state.isLoading = true;
        },
        genresReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        genresRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: genresReducer, actions } = genresSlice;
const { genresRequested, genresReceved, genresRequestFailed } = actions;

export const loadGenresList = () => async (dispatch) => {
    dispatch(genresRequested());
    try {
        const { content } = await genresService.get();
        dispatch(genresReceved(content));
    } catch (error) {
        dispatch(genresRequestFailed(error));
    }
};

export const getGenresList = () => (state) => state.genres.entities;
export const getGenresListLoadingStatus = () => (state) =>
    state.genres.isLoading;
export const getGenreByName = (name) => (state) =>
    state.genres.entities
        ? state.genres.entities.find((g) => g.name === name)
        : null;
export const getGenreById = (id) => (state) =>
    state.genres.entities
        ? state.genres.entities.find((g) => g.id === id)
        : null;

export default genresReducer;
