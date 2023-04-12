import { createAction, createSlice } from "@reduxjs/toolkit";
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
        },
        chapterUpload: (state, action) => {
            state.entities.push(action.payload);
        }
    }
});

const { reducer: chaptersReducer, actions } = chaptersSlice;
const {
    chaptersRequested,
    chaptersReceved,
    chaptersRequestFailed,
    chapterUpload
} = actions;

const uploadChapterRequested = createAction("chapters/uploadChapterRequested");
const uploadChapterRequestFailed = createAction(
    "chapters/uploadChapterRequestFailed"
);

export const loadChaptersList = () => async (dispatch) => {
    dispatch(chaptersRequested());
    try {
        const { content } = await chaptersService.get();
        dispatch(chaptersReceved(content));
    } catch (error) {
        dispatch(chaptersRequestFailed(error));
    }
};
export const uploadChapter = (payload) => async (dispatch) => {
    dispatch(uploadChapterRequested());
    try {
        const { content } = await chaptersService.upload(payload);
        dispatch(chapterUpload(content));
    } catch (error) {
        dispatch(uploadChapterRequestFailed(error));
    }
};

export const getChaptersList = () => (state) => state.chapters.entities;
export const getChaptersListLoadingStatus = () => (state) =>
    state.chapters.isLoading;
export const getChaptersById = (id) => (state) =>
    state.chapters.entities
        ? state.chapters.entities.filter((c) => c.mangaId === id)
        : [];
export const getUploadByUser = (id) => (state) =>
    state.chapters.entities
        ? state.chapters.entities.filter((c) => c.uploadBy === id)
        : [];

export default chaptersReducer;
