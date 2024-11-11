import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import MovieList from '../components/MovieList';
import MovieForm from '../components/MovieForm';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Welcome, {user.username}</h2>
        <button className="btn btn-secondary" onClick={logout}>
          Logout
        </button>
      </div>
      <MovieForm />
      <MovieList />
    </div>
  );
};

export default Dashboard;
