import { combineReducers, configureStore } from "@reduxjs/toolkit";
import chaptersReducer from "./chapters";
import commentsReducer from "./comments";
import genresReducer from "./genres";
import mangaReducer from "./product";
import usersReducer from "./users";

const rootReducer = combineReducers({
    manga: mangaReducer,
    chapters: chaptersReducer,
    genres: genresReducer,
    comments: commentsReducer,
    users: usersReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
