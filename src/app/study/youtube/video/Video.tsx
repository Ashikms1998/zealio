import React from 'react';
import './_video.scss';
import VideoCard from './VideoCard';

interface VideoProps {
  info: any;
}

const Video: React.FC<VideoProps> = ({ info }) => {
  return (
    <div>
      <VideoCard info={info} />
    </div>
  );
};

export default Video;