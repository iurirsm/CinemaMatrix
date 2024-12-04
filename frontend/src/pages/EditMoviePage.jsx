import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function EditMoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useContext(AuthContext); // Get the loading state

  // Fetch existing movie data
  useEffect(() => {
    const fetchMovieData = async () => {
      if (!user || !user.token) return;

      try {
        const response = await axios.get(`http://localhost:3000/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setMovieData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch movie data");
        setLoading(false);
      }
    };

    if (!authLoading) fetchMovieData(); // Wait until AuthProvider has finished loading
  }, [id, user, authLoading]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.token) {
      setError("User is not authenticated.");
      return;
    }

    try {
      await axios.patch(`http://localhost:3000/movies/${id}`, movieData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Movie updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update movie");
    }
  };

  if (authLoading || loading) {
    return <div className="container py-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
        <Link to="/dashboard" className="btn btn-secondary mt-3">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Link to="/dashboard">
        <IoIosArrowRoundBack style={{ fontSize: "2.5rem", color: "black" }} />
      </Link>
      <div className="pt-4">
        <h3>Edit Movie</h3>
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
            <div className="d-flex justify-content-center align-items-center gap-5 pt-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="seen"
                  checked={movieData.seen}
                  onChange={handleChange}
                />
                <label className="form-check-label">Seen</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="favourite"
                  checked={movieData.favourite}
                  onChange={handleChange}
                />
                <label className="form-check-label">Favourite</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="wishlist"
                  checked={movieData.wishlist}
                  onChange={handleChange}
                />
                <label className="form-check-label">Wishlist</label>
              </div>
            </div>
            {/* Submit Button */}
          </div>
          <div className="d-flex justify-content-center align-items-center pt-3">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMoviePage;
