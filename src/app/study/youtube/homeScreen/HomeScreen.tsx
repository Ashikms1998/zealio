import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import CategoriesBar from '../catgoriesBar/CategoriesBar';
import { YOUTUBE_VIDEO_API } from '../constant';
import VideoCard from '../video/VideoCard';
import Link from 'next/link';
import { useSearch } from '../search-context/SearchContext';
import { YouTubeVideo } from '../../../../../types';


const HomeScreen = () => {

  console.log("HomeScreen rendering");
  const { searchResults } = useSearch();
  console.log("HomeScreen - searchResults:", searchResults);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  console.log(videos, "videos here")

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await fetch(YOUTUBE_VIDEO_API);
        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    getVideos();
  }, []);


  useEffect(() => {
    console.log(searchResults, "home screen le items here")
    if (searchResults.length > 0) {
      setVideos(searchResults);
    }
  }, [searchResults]);

  return (
    <>
      <Container>
        {/* <CategoriesBar /> */}
        <Row>

          {videos.map((video,index) => (
            <Col lg={3} md={4} key={index}>
              <Link href={"http://localhost:3000/study/youtube/watch-page?v=" + video.id}
                className="no-underline"
                style={{ textDecoration: 'none' }}
              >
                <VideoCard info={video} />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
};

export default HomeScreen