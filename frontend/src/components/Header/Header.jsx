import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order Your Favourite Food, Delivered Fast!</h2>
            <p>Indulge in a variety of delicious dishes, made fresh and delivered straight to your door. Whether it's a quick snack or a hearty meal, we have it all!</p>
        </div>
    </div>
  )
}

export default Header
