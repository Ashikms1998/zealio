import React from 'react'
import Image from 'next/image'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeScreen from './homeScreen/HomeScreen'
import Header from './header/Header'
import { Provider } from 'react-redux';
import store from '@/redux/store'
import { ReduxProvider } from './ReduxProvider'
const page = () => {
  return (
    <ReduxProvider>
    <>
      <Header />
      <div className='app__container border border-info'>
        <Container fluid className='app__main border border-red-700'>
          <HomeScreen />
        </Container>
      </div>
    </>
    </ReduxProvider>
  )
}

export default page