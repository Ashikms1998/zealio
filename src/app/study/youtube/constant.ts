const YOUTUBE_API_KEY = "AIzaSyDLLSDUK8YAItQExi_bFg-xVK1DTNm67Lg";

const YOUTUBE_API_KEY_2 = "AIzaSyBYsXYEzXXOFzsr4YtkI23iuKdSv5REy-g";

export const YOUTUBE_VIDEO_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&videoCategoryId=10&maxResults=28&regionCode=US&key=" +
  YOUTUBE_API_KEY_2;

export const YOUTUBE_SEARCH_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=28&regionCode=IN&key=${YOUTUBE_API_KEY_2}&q=`;
