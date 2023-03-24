import { createSlice } from "@reduxjs/toolkit";
import commentsService from "../services/comments.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const { commentsRequested, commentsReceved, commentsRequestFailed } = actions;

export const loadCommentsList = () => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentsService.get();
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error));
    }
};

export const getCommentsList = () => (state) => state.comments.entities;
export const getCommentsListLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
