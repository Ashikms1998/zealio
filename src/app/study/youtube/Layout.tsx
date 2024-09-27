import React from 'react'
import Header from './header/Header'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './_app.scss'

const Layout = ({ children }: any) => {
    return (
        <>
            <Header />
            <div className="app__container border border-info">
                <Container fluid className="app__main border border-red-700">
                    {children}
                </Container>
            </div>
        </>
    )
}

export default Layout