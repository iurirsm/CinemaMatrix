import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const MovieForm = ({ onMovieAdded }) => {
  const [movieData, setMovieData] = useState({
    name: '',
    director: '',
    producer: '',
    distributor: '',
    genre: '',
    releaseYear: '',
    status: {
      seen: false,
      favourite: false,
      wishlist: false,
    },
  });
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (['seen', 'favourite', 'wishlist'].includes(name)) {
      setMovieData((prevState) => ({
        ...prevState,
        status: {
          ...prevState.status,
          [name]: checked,
        },
      }));
    } else {
      setMovieData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the data before sending
    const dataToSend = {
      ...movieData,
      director: movieData.director.split(',').map((dir) => dir.trim()),
      producer: movieData.producer.split(',').map((prod) => prod.trim()),
      releaseYear: parseInt(movieData.releaseYear),
    };
  
    try {
      await axios.post('http://localhost:3000/movies/add', dataToSend, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Clear the form after successful submission
      setMovieData({
        name: '',
        director: '',
        producer: '',
        distributor: '',
        genre: '',
        releaseYear: '',
        status: {
          seen: false,
          favourite: false,
          wishlist: false,
        },
      });
      // Refresh the movie list
      if (onMovieAdded) onMovieAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add movie');
    }
  };
  

  return (
    <div className="mt-4">
      <h3>Add Movie</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={movieData.name}
            onChange={handleChange}
            required
          />
        </div>
        {/* Director */}
        <div className="mb-3">
          <label className="form-label">Director(s)</label>
          <input
            type="text"
            className="form-control"
            name="director"
            value={movieData.director}
            onChange={handleChange}
            placeholder="Separate multiple directors with commas"
            required
          />
        </div>
        {/* Producer */}
        <div className="mb-3">
          <label className="form-label">Producer(s)</label>
          <input
            type="text"
            className="form-control"
            name="producer"
            value={movieData.producer}
            onChange={handleChange}
            placeholder="Separate multiple producers with commas"
            required
          />
        </div>
        {/* Distributor */}
        <div className="mb-3">
          <label className="form-label">Distributor</label>
          <input
            type="text"
            className="form-control"
            name="distributor"
            value={movieData.distributor}
            onChange={handleChange}
            required
          />
        </div>
        {/* Genre */}
        <div className="mb-3">
          <label className="form-label">Genre</label>
          <input
            type="text"
            className="form-control"
            name="genre"
            value={movieData.genre}
            onChange={handleChange}
            required
          />
        </div>
        {/* Release Year */}
        <div className="mb-3">
          <label className="form-label">Release Year</label>
          <input
            type="number"
            className="form-control"
            name="releaseYear"
            value={movieData.releaseYear}
            onChange={handleChange}
            required
          />
        </div>
        {/* Status Checkboxes */}
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="seen"
            checked={movieData.status.seen}
            onChange={handleChange}
          />
          <label className="form-check-label">Seen</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="favourite"
            checked={movieData.status.favourite}
            onChange={handleChange}
          />
          <label className="form-check-label">Favourite</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="wishlist"
            checked={movieData.status.wishlist}
            onChange={handleChange}
          />
          <label className="form-check-label">Wishlist</label>
        </div>
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-3">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
