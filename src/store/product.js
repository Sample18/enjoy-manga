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
        }
    }
});

const { reducer: mangaReducer, actions } = productSlice;
const { mangaRequested, mangaReceved, mangaRequestFailed, mangaUploaded } =
    actions;

const mangaUploadRequested = createAction("manga/mangaUploadRequested");
const mangaUploadRequestFailed = createAction("manga/mangaUploadRequestFailed");

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

export const getMangaList = () => (state) => state.manga.entities;
export const getMangaListLoadingStatus = () => (state) => state.manga.isLoading;

export default mangaReducer;
