import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  // Fetch movies
  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:3000/movies', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setMovies(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch movies');
      console.error(err);
    }
  };
  
  useEffect(() => {
    fetchMovies();
  }, []);

  // Handle movie deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchMovies();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete movie');
      console.error(err);
    }
  };

  return (
    <div className="mt-5">
      <h3>Your Movies</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Director(s)</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.name}</td>
              <td>{Array.isArray(movie.director) ? movie.director.join(', ') : movie.director}</td>
              <td>{movie.genre}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(movie._id)}
                >
                  Delete
                </button>
                {/* Future Update functionality */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;
