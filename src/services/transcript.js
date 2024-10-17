import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const youtubeApiKey = import.meta.env.VITE_RAPID_API_YOUTUBE_KEY


export const youtubeApi = createApi({
    reducerPath: 'youtubeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://youtube-transcriptor.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', youtubeApiKey);
            headers.set('x-rapidapi-host',  'youtube-transcriptor.p.rapidapi.com');
            console.log(headers)
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTranscript: builder.query({
            query: (videoId) => `/transcript?video_id=${videoId}`
        }),
    }),
    
})


export const { useLazyGetTranscriptQuery } = youtubeApi;