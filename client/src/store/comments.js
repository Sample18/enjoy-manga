import { createAction, createSlice } from "@reduxjs/toolkit";
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
        },
        commentsCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentsDeleted: (state, action) => {
            state.entities = state.entities.filter(
                (comment) => comment._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceved,
    commentsRequestFailed,
    commentsCreated,
    commentsDeleted
} = actions;

const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentCreateFailed = createAction("comments/commentCreateFailed");
const commentDeleteRequested = createAction("comments/commentDeleteRequested");
const commentDeleteFailed = createAction("comments/commentDeleteFailed");

export const loadCommentsList = (pageId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentsService.getComments(pageId);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error));
    }
};
export const createComment = (payload) => async (dispatch) => {
    dispatch(commentCreateRequested());
    try {
        const { content } = await commentsService.create(payload);
        dispatch(commentsCreated(content));
    } catch (error) {
        dispatch(commentCreateFailed(error));
    }
};
export const deleteComment = (id) => async (dispatch) => {
    dispatch(commentDeleteRequested());
    try {
        await commentsService.remove(id);
        dispatch(commentsDeleted(id));
    } catch (error) {
        dispatch(commentDeleteFailed(error));
    }
};

export const getCommentsList = () => (state) => state.comments.entities;
export const getCommentsListLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
