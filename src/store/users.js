import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/users.service";
import generateAuthError from "../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdated: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u.id === action.payload.id)
            ] = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceved,
    usersRequestFailed,
    authRequested,
    authRequestSuccess,
    authRequestFailed,
    userLoggedOut,
    userCreated,
    userUpdated
} = actions;

const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");
const updateeUserFailed = createAction("users/updateeUserFailed");

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceved(content));
    } catch (error) {
        dispatch(usersRequestFailed(error));
    }
};
export const singUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            dispatch(createUser({ id: data.localId, email, ...rest }));
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };
export const logIn =
    ({ email, password }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            dispatch(authRequestSuccess({ userId: data.localId }));
            localStorageService.setTokens(data);
            // history.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };
export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    // history.push("/");
};
function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested());
        try {
            const { content } = await userService.create(payload);
            dispatch(userCreated(content));
        } catch (error) {
            dispatch(createUserFailed());
        }
    };
}
export const updateUser = (payload) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.update(payload);
        dispatch(userUpdated(content));
    } catch (error) {
        dispatch(updateeUserFailed());
    }
};

export const getUsersList = () => (state) => state.users.entities;
export const getUsersListLoadingStatus = () => (state) => state.users.isLoading;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find((u) => u.id === state.users.auth.userId)
        : null;
};
export const getAuthError = () => (state) => state.users.error;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUserById = (id) => (state) =>
    state.users.entities.find((u) => u.id === id);

export default usersReducer;
