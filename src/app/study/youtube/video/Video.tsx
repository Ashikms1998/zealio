import React from 'react'
import './_video.scss'

import { AiFillEye } from 'react-icons/ai'

const Video = () => {
  return (
    <div className='video'>
      <div className='video__top'>
        <img
          src='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f6ec2b100579611.5ff9a6372d706.jpg'
          alt=''
        />
        <span>05:43</span>
      </div>
      <div className='video__title'>
        S24FE: The Most compact phone ever made by Samsung
      </div>
      <div className='video__details'>

        <AiFillEye /> 5m Views •

        <span>5 days ago</span>
      </div>
      <div className='video__channel'>
        <img
          src='https://i.redd.it/n6k9babm3ek21.png'
          alt=''
        />
        <p>MKBHD</p>
      </div>
    </div>
  )
}

export default Video