import React from 'react'
import { FaBars } from 'react-icons/fa'
import {AiOutlineSearch} from "react-icons/ai"
import {MdNotifications, MdApps} from "react-icons/md"
import './_header.scss';

const Header = () => {
  return (
    <div className='border border-gray-900 header'>
      <FaBars size={26} className='header__menu'/>
      <img src='https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg' alt='logo' className='header__logo'/>
      <form>
        <input type='text' placeholder='search'/>
        <button type='submit'>
          <AiOutlineSearch size={22}/>
        </button>
      </form>
      <div className='header__icons'>
        <MdNotifications size={28}/>
        <MdApps size={28}/>
        <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="avatar" />
      </div>
    </div>
  )
}

export default Header