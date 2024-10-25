import React from 'react'
import Layout from '../Layout'
import { SearchProvider } from '../search-context/SearchContext'

const SearchPage = () => {
  return (
    <SearchProvider>
    <Layout>
      <h1>Search Results</h1>
    </Layout>
    </SearchProvider>
  )
}

export default SearchPage