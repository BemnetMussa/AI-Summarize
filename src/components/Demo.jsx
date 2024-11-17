import React, { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery, useSummarizeTextMutation } from "../services/article";
import { useLazyGetTranscriptQuery } from "../services/transcript";
import { useGetSpeechMutation } from "../services/speech";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  // RTK lazy query
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [summarizeText, { erro, isFetchin}] = useSummarizeTextMutation();
  const [getTranscript, {data: transcript}] = useLazyGetTranscriptQuery();
  const [getSpeech] = useGetSpeechMutation();


  // Load data from localStorage on mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    // Check if the URL is a YouTube link
    if (article.url.includes('youtube.com') || article.url.includes('youtu.be')) {
        // Extract video ID (you may need a more robust method for different URL formats)
        const videoId = new URL(article.url).searchParams.get('v');
        
        // Fetch transcript from YouTube API
        const transcriptResponse1 = await getTranscript(videoId);
   
        console.log(transcriptResponse1)
        if (transcriptResponse1) {
            // Pass the transcript to the summarization API
            const transcriptResponse = transcriptResponse1.data.map((val) => {
              return val
            })
  
            const { data } = await summarizeText({ textContent: transcriptResponse[0].transcriptionAsText});
            console.log(data)
            
            if (data?.result) {
                const newArticle = { ...article, summary: data.result };
                const updatedAllArticles = [newArticle, ...allArticles];

                // Update state and local storage
                setArticle(newArticle);
                setAllArticles(updatedAllArticles);
                localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
            }
        } else {
            console.error("Failed to fetch transcript");
          
        }
    } else {
        // Regular article summarization
        const { data } = await getSummary({ articleUrl: article.url });
        if (data?.result) {
            const newArticle = { ...article, summary: data.result };
            const updatedAllArticles = [newArticle, ...allArticles];

            // Update state and local storage
            setArticle(newArticle);
            setAllArticles(updatedAllArticles);
            localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
        } else {
            console.error("Failed to fetch summary");
        }
    }
};


  // copy the url and toggle the icon for user feedback
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };


  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };


  const speechActivated = async () => {
    if (article.summary) {
      const speechResponse = await getSpeech({ textSpeech: article.summary });
     
      if (speechResponse.data) {
        const audio = new Audio(speechResponse.data[0].link); // The API should return an audio URL
        console.log(audio)
        await audio.play().catch(error => {
          console.error("error: ", error)
        });
      
      } else {
        console.error("Failed to generate speech");
      }
    }
  };




  return (
    <section className='mt-16 w-full max-w-xl'>
      {/* Search */}
      <div className='flex flex-col w-full gap-2'>
        <form
          className='relative flex justify-center items-center'
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt='link-icon'
            className='absolute left-0 my-2 ml-3 w-5'
          />

          <input
            type='url'
            placeholder='Paste the article link'
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            onKeyDown={handleKeyDown}
            required
            className='url_input peer' // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
          />
          <button
            type='submit'
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 '
          >
            <p>↵</p>
          </button>
        </form>

        {/* Browse History */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Result */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Well, that wasn't supposed to happen...
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (

          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
           <div className="mb-40 justify-end w-full  flex">

            <button className="text-center bg-blue-300 rounded-full px-4 py-4 font-bold hover:bg-blue-500 hover:text-white" onClick={speechActivated}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
            </button>

        </div>
    </section>
  );
};

export default Demo;