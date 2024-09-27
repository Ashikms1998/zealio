import React from 'react'
import Video from '../video/Video'
import { Container, Row, Col } from 'react-bootstrap';
import CategoriesBar from '../catgoriesBar/CategoriesBar';
const HomeScreen = () => {
  return (
    <>
      <Container>
        <CategoriesBar />
        <Row>
          {[...new Array(20)].map((_, index) => (
            <Col lg={3} md={4} key={index}>
              <Video />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default HomeScreen