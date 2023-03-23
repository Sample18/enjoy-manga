import { combineReducers, configureStore } from "@reduxjs/toolkit";
import chaptersReducer from "./chapters";
import mangaReducer from "./product";

const rootReducer = combineReducers({
    manga: mangaReducer,
    chapters: chaptersReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
