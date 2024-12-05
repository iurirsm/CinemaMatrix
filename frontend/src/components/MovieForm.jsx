import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

const MovieForm = () => {
  const [movieData, setMovieData] = useState({
    name: "",
    director: "",
    producer: "",
    distributor: "",
    genre: "",
    releaseYear: "",
    status: {
      seen: false,
      favourite: false,
      wishlist: false,
    },
  });
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data before sending
    const dataToSend = {
      ...movieData,
      director: movieData.director.split(",").map((dir) => dir.trim()),
      producer: movieData.producer.split(",").map((prod) => prod.trim()),
      releaseYear: parseInt(movieData.releaseYear),
    };

    try {
      await axios.post("/movies/add", dataToSend, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Clear the form after successful submission
      setMovieData({
        name: "",
        director: "",
        producer: "",
        distributor: "",
        genre: "",
        releaseYear: "",
        seen: false,
        favourite: false,
        wishlist: false,
      });
      alert("Movie Added successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add movie");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setMovieData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="container py-5">
      <Link to="/dashboard">
        <IoIosArrowRoundBack style={{ fontSize: "2.5rem", color: "black" }} />
      </Link>
      <div className="pt-4">
        <h3>Add Movie</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Name */}
            <div className="col-md-6 mb-3">
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
            <div className="col-md-6 mb-3">
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
            <div className="col-md-6 mb-3">
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
            <div className="col-md-6 mb-3">
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
            <div className="col-md-6 mb-3">
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
            <div className="col-md-6 mb-3">
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
            <hr />
            <div className="d-flex justify-content-center align-text-center gap-5 pt-3">
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="seen"
                  checked={movieData.seen || false}
                  onChange={handleChange}
                />
                <label className="form-check-label">Seen</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="favourite"
                  checked={movieData.favourite || false}
                  onChange={handleChange}
                />
                <label className="form-check-label">Favourite</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="wishlist"
                  checked={movieData.wishlist || false}
                  onChange={handleChange}
                />
                <label className="form-check-label">Wishlist</label>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center pt-3">
            <button type="submit" className="btn btn-primary ">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
