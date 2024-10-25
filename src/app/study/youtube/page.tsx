'use client'

import React from 'react'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeScreen from './homeScreen/HomeScreen'
import Header from './header/Header'
import { SearchProvider } from './search-context/SearchContext'

const page: React.FC = () => {
  return (
    <SearchProvider>
      <Header />
      <div className='app__container border border-info'>
        <Container fluid className='app__main border border-red-700'>
          <HomeScreen />
        </Container>
      </div>
    </SearchProvider>
  )
}

export default page