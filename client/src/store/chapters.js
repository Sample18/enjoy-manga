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
        },
        chapterUpdated: (state, action) => {
            state.entities[
                state.entities.findIndex((c) => c._id === action.payload._id)
            ] = action.payload;
        },
        chapterRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (chapter) => chapter._id !== action.payload
            );
        }
    }
});

const { reducer: chaptersReducer, actions } = chaptersSlice;
const {
    chaptersRequested,
    chaptersReceved,
    chaptersRequestFailed,
    chapterUpload,
    chapterUpdated,
    chapterRemoved
} = actions;

const uploadChapterRequested = createAction("chapters/uploadChapterRequested");
const uploadChapterRequestFailed = createAction(
    "chapters/uploadChapterRequestFailed"
);
const updateChapterRequested = createAction("chapters/updateChapterRequested");
const updateChapterRequestFailed = createAction(
    "chapters/updateChapterRequestFailed"
);
const removeChapterRequested = createAction("chapters/removeChapterRequested");
const removeChapterRequestFailed = createAction(
    "chapters/removeChapterRequestFailed"
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
export const updateChapter = (payload) => async (dispatch) => {
    dispatch(updateChapterRequested());
    try {
        const { content } = await chaptersService.update(payload);
        dispatch(chapterUpdated(content));
    } catch (error) {
        dispatch(updateChapterRequestFailed(error));
    }
};
export const removeChapter = (id) => async (dispatch) => {
    dispatch(removeChapterRequested());
    try {
        await chaptersService.remove(id);
        dispatch(chapterRemoved(id));
    } catch (error) {
        dispatch(removeChapterRequestFailed(error));
    }
};

export const getChaptersList = () => (state) => state.chapters.entities;
export const getAcceptedChaptersList = () => (state) =>
    state.chapters.entities
        ? state.chapters.entities.filter((c) => c.moderateStatus === "accepted")
        : null;
export const getModerateChaptersList = () => (state) =>
    state.chapters.entities
        ? state.chapters.entities.filter((c) => c.moderateStatus === "onCheck")
        : [];
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
export const getChapterByIds = (ids) => (state) =>
    ids.map((id) => state.chapters.entities.find((c) => c._id === id));

export default chaptersReducer;
