'use client'
import { useSearchParams } from 'next/navigation';
import React from 'react'
import Header from '../header/Header';
import { SearchProvider } from '../search-context/SearchContext';

const page = () => {

  const searchParams = useSearchParams();
  const videoId = searchParams.get("v");
  console.log(videoId,"video id")

  return (
    <SearchProvider>
    <div className='h-screen flex flex-col'>
    <Header />
    <div className='flex-1 flex justify-center items-center bg-gray-800'>
        <iframe
          width="1000" height="617"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
    </SearchProvider>
  )
}

export default page