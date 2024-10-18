import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./article";
import { youtubeApi } from "./transcript";
import { speechApi } from "./speech"; // Import your speechApi

export const store = configureStore({
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer,
        [youtubeApi.reducerPath]: youtubeApi.reducer,
        [speechApi.reducerPath]: speechApi.reducer, // Add the speechApi reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(articleApi.middleware)
            .concat(youtubeApi.middleware)
            .concat(speechApi.middleware), // Add speechApi middleware
});
