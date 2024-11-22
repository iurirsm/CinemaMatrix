import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';  
import home from './Images/home3.png';

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);  

  return (
    <nav className="navbar">
      <div className="desktopMenu">

        <Link to="/homepage">
          <img src={home} alt="CinemaMatrix Home" className="home" />
        </Link>
        <Link to="/dashboard">Dashboard</Link>
        
        {user ? (
          <>
            <Link to="/profile">Profile</Link>  
            <Link to="/" onClick={logout} className="logout-link">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>  
            <Link to="/register">Register</Link>  
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
