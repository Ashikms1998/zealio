import React, { createContext, useContext, useEffect, useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai"
import './_header.scss';
import { YOUTUBE_SEARCH_API } from '../constant';
import { YouTubeResponse, YouTubeVideo } from '../../../../../types';
import { useSearch } from '../search-context/SearchContext';

const Header = () => {

  const { searchQuery, setSearchQuery, setSearchResults } = useSearch();
  const [suggestions, setSuggestions] = useState<YouTubeVideo[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false)



  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        getSearchSuggestions();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);



  const getSearchSuggestions = async () => {
    try {
      const response = await fetch(`${YOUTUBE_SEARCH_API}${searchQuery}`);
      console.log(response, "search akkiya item here")
      const data: YouTubeResponse = await response.json();
      if (data.items) {
        setSuggestions(data.items);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  
  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await fetch(`${YOUTUBE_SEARCH_API}${searchQuery}`);
        console.log("Search response:", response);
        const data: YouTubeResponse = await response.json();
        console.log("Parsed data:", data);
  
        if (data.items && data.items.length > 0) {
          console.log("Received search results:", data.items);
          setSearchResults(data.items);
          console.log("Search results set:", searchQuery);
        } else {
          console.log("No search results found");
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error performing search:', error);
        setSearchResults([]);
      }
    };
  
    if (searchQuery) {
      handleSearch();
    }
  }, [searchQuery]);



  return (

    <div className='grid grid-flow-col p-3 m-2 shadow-lg' >
      <div className='flex col-span-1'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg' alt='logo' className='w-28 ' />
      </div>
      <div className='col-span-10 px-10 relative'>
        <div className='flex items-center'>
          <input className='w-5/12 border border-gray-400 p-2 rounded-l-full'
            type='text' placeholder='search' value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button type='submit' className='border border-gray-400 px-3 py-2 rounded-r-full bg-gray-100'>
            <AiOutlineSearch size={22} />
          </button>
        </div>
        {showSuggestions && (
          <div className='absolute bg-white px-5 py-2 w-[31rem] shadow-lg border rounded-md  border-gray-100'>
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index} className='py-2  hover:bg-gray-100 whitespace-nowrap overflow-hidden text-sm font-medium text-ellipsis'
                  onClick={() => {
                    setSearchQuery(suggestion.snippet.title);
                    setShowSuggestions(false);
                  }}
                >
                  {suggestion.snippet.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>

  ) 
}

export default Header