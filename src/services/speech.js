import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Get the API key from environment variables
const speechApiKey = import.meta.env.VITE_RAPID_API_SPEECH_KEY;

export const speechApi = createApi({
    reducerPath: 'speechApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://realistic-text-to-speech.p.rapidapi.com/v3', // Base URL for the API
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', speechApiKey); // Set API key from environment
            headers.set('x-rapidapi-host', 'realistic-text-to-speech.p.rapidapi.com'); // Set the host
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSpeech: builder.mutation({
            query: (params) => ({
                url: '/generate_voice_over_v2',  // Ensure this is the correct endpoint for TTS
                method: 'POST', // Set the method to POST
                body: {
                voice_obj: {
                    id:2013,
                    voice_id:"en-GB-Neural2-F",
                    gender:"Female",
                    language_code:"en-GB",
                    language_name:"British English",
                    voice_name:"Holly",
                    sample_text:"Hello, hope you're having a great time making your video.",
                    sample_audio_url:"https://s3.ap-south-1.amazonaws.com/invideo-uploads-ap-south-1/speechen-GB-Neural2-F16831903681350.mp3",
                    status:2,
                    rank:0,
                    type:"google_tts",
                    isPlaying: false

                    
                },
                   json_data: [
                    {
                        block_index: 0,
                        text: params.textSpeech
                    }
                ]
                },
                headers: {
                    'Content-Type': 'application/json', // Set the content type
                },
            }),
            transformResponse: (response) => {
                console.log("API Response:", response); // Log the full response for debugging

                // Handle error if response does not include a success status
                if (response && response.result && response.result.success === false) {
                    const errorMessage = response.result.message || 'Text-to-speech conversion failed';
                    throw new Error(errorMessage);
                }

                return response; // Return the successful result for further processing
            },
        }),
    }),
});

// Export the hook for use in your components
export const { useGetSpeechMutation } = speechApi;
