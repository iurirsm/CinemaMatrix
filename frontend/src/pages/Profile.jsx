import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext); 

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome, {user.username}!</p> 
      <p>Email: {user.email}</p> 
    </div>
  );
};

export default Profile;
