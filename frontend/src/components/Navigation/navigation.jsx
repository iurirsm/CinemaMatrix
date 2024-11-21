import React, { useState, useContext } from 'react';
import './navigation.css';
import { Link } from 'react-router-dom'; 
import home from './Images/home3.png';

const Navigation = () => {

    return (
        <nav className="navbar">
            <div className="desktopMenu">
            <Link to="/">
            <img src={home} alt="CinemaMatrix Home" className="home" /></Link>
            <Link to="/dashboard" className="desktopMenuListItem">Dashboard</Link>
            <Link to="/profile" className="desktopMenuListItem">Profile</Link>
            <Link to="/login" className="desktopMenuListItem">Login/Register</Link>

            </div>

        </nav>
    )
}

export default Navigation;