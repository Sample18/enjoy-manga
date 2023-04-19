import { createAction, createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";

const productSlice = createSlice({
    name: "manga",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        mangaRequested: (state) => {
            state.isLoading = true;
        },
        mangaReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        mangaRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        mangaUploaded: (state, action) => {
            state.entities.push(action.payload);
        },
        mangaUpdated: (state, action) => {
            state.entities[
                state.entities.findIndex((m) => m._id === action.payload._id)
            ] = action.payload;
        }
    }
});

const { reducer: mangaReducer, actions } = productSlice;
const {
    mangaRequested,
    mangaReceved,
    mangaRequestFailed,
    mangaUploaded,
    mangaUpdated
} = actions;

const mangaUploadRequested = createAction("manga/mangaUploadRequested");
const mangaUploadRequestFailed = createAction("manga/mangaUploadRequestFailed");
const mangaUpdateRequestFailed = createAction("manga/mangaUpdateRequestFailed");
const mangaUpdateRequested = createAction("manga/mangaUpdateRequested");

export const loadMangaList = () => async (dispatch) => {
    dispatch(mangaRequested());
    try {
        const { content } = await productService.get();
        dispatch(mangaReceved(content));
    } catch (error) {
        dispatch(mangaRequestFailed(error));
    }
};
export const uploadManga = (payload) => async (dispatch) => {
    dispatch(mangaUploadRequested());
    try {
        const { content } = await productService.upload(payload);
        dispatch(mangaUploaded(content));
    } catch (error) {
        dispatch(mangaUploadRequestFailed(error));
    }
};
export const updateManga = (payload) => async (dispatch) => {
    dispatch(mangaUpdateRequested());
    try {
        const { content } = await productService.update(payload);
        dispatch(mangaUpdated(content));
    } catch (error) {
        dispatch(mangaUpdateRequestFailed(error));
    }
};

export const getMangaList = () => (state) => state.manga.entities;
export const getMangaListLoadingStatus = () => (state) => state.manga.isLoading;
export const getMangaByName = (name) => (state) =>
    state.manga.entities
        ? state.manga.entities.find(
              (m) => m.name.toLowerCase().replace(/ /g, "") === name
          )
        : null;

export const getMangaById = (id) => (state) =>
    state.manga.entities
        ? state.manga.entities.find((m) => m._id === id)
        : null;

export default mangaReducer;
