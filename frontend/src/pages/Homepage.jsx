import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Homepage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>CinemaMatrix Homepage</h1>
      {/* Show a personalized welcome message if logged in */}
      {user ? (
        <p>Welcome, {user.username}!</p>
      ) : (
        <p>Welcome to CinemaMatrix! Please login or register to begin adding movies to your very own database!.</p>
      )}
    </div>
  );
};

export default Homepage;
