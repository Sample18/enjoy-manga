import { createSlice } from "@reduxjs/toolkit";
import chaptersService from "../services/chapters.service";

const chaptersSlice = createSlice({
    name: "chapters",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        chaptersRequested: (state) => {
            state.isLoading = true;
        },
        chaptersReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        chaptersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: chaptersReducer, actions } = chaptersSlice;
const { chaptersRequested, chaptersReceved, chaptersRequestFailed } = actions;

export const loadChaptersList = () => async (dispatch) => {
    dispatch(chaptersRequested());
    try {
        const { content } = await chaptersService.get();
        dispatch(chaptersReceved(content));
    } catch (error) {
        dispatch(chaptersRequestFailed(error));
    }
};

export const getChaptersList = () => (state) => state.chapters.entities;
export const getChaptersListLoadingStatus = () => (state) =>
    state.chapters.isLoading;

export default chaptersReducer;
