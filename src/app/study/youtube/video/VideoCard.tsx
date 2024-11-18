import React from 'react'

const VideoCard = ({ info }: any) => {

    const { snippet, statistics } = info
    const { channelTitle, title, thumbnails } = snippet

    return (
        <div className='video p-2 hover:bg-gray-100 rounded-lg'>
            <img alt='Thumbnail' className='rounded-md' src={thumbnails.medium.url} />
            <ul className="flex flex-col space-y-1  ">

                <li className="font-sans font-semibold text-black truncate" style={{ textDecoration: 'none' }}>
                    {title}
                </li>

                <li className="text-xs font-semibold text-gray-800">
                    {channelTitle}
                </li>
                <li className="text-xs font-semibold text-gray-800">
                    {statistics.viewCount} views
                </li>
            </ul>
        </div>
    )
}

export default VideoCard