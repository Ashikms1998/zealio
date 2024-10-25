'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { YouTubeVideo } from "../../../../../types";


interface SearchContextType {
  searchResults: YouTubeVideo[];
  setSearchResults: React.Dispatch<React.SetStateAction<YouTubeVideo[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchResults, setSearchResults] = useState<YouTubeVideo[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
  
    return (
      <SearchContext.Provider value={{ searchResults, setSearchResults, searchQuery, setSearchQuery }}>
        {children}
      </SearchContext.Provider>
    );
  };

  export const useSearch = () => {
    const context = useContext(SearchContext);
    console.log(context,"search context il vanna item")
    if (context === undefined) {
      throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
  };