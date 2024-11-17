import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://open-ai21.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', rapidApiKey);
            headers.set('x-rapidapi-host', 'open-ai21.p.rapidapi.com');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => ({
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    text: `Please provide a detailed and comprehensive summary of the following content: ${params.articleUrl}`
                }
            }),
        }),
       
        summarizeText: builder.mutation({
            query: (params) => ({
                url: '/summary',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    lang: 'en', // Specify language if needed
                    text: params.textContent, // Your actual text for summarization
                },
            }),
        }),
    }),
});

// Export hooks for each query or mutation
export const { useLazyGetSummaryQuery, useSummarizeTextMutation } = articleApi;
