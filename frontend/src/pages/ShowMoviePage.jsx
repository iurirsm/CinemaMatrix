import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function ShowMoviePage() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState("");
  const { user, loading } = useContext(AuthContext);

  // Fetch movie data
  useEffect(() => {
    const fetchMovieData = async () => {
      if (!user?.token) return; // Wait until the token is available

      try {
        const response = await axios.get(`/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setMovieData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch movie data");
      }
    };

    fetchMovieData();
  }, [id, user?.token]);

  if (loading) {
    return (
      <div className="container py-5">
        <div>Loading authentication...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <Link to="/dashboard">
          <IoIosArrowRoundBack style={{ fontSize: "2.5rem", color: "black" }} />
        </Link>
        <div className="alert alert-danger mt-4">{error}</div>
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="container py-5">
        <Link to="/dashboard">
          <IoIosArrowRoundBack style={{ fontSize: "2.5rem", color: "black" }} />
        </Link>
        <div className="mt-4">Loading movie data...</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Link to="/dashboard">
        <IoIosArrowRoundBack style={{ fontSize: "2.5rem", color: "black" }} />
      </Link>
      <div className="pt-4">
        <h3>Movie Info</h3>
        <div className="row">
          {/* Name */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={movieData.name || ""}
              disabled
            />
          </div>
          {/* Director */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Director(s)</label>
            <input
              type="text"
              className="form-control"
              name="director"
              value={movieData.director || ""}
              disabled
            />
          </div>
          {/* Producer */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Producer(s)</label>
            <input
              type="text"
              className="form-control"
              name="producer"
              value={movieData.producer || ""}
              disabled
            />
          </div>
          {/* Distributor */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Distributor</label>
            <input
              type="text"
              className="form-control"
              name="distributor"
              value={movieData.distributor || ""}
              disabled
            />
          </div>
          {/* Genre */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Genre</label>
            <input
              type="text"
              className="form-control"
              name="genre"
              value={movieData.genre || ""}
              disabled
            />
          </div>
          {/* Release Year */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Release Year</label>
            <input
              type="number"
              className="form-control"
              name="releaseYear"
              value={movieData.releaseYear || ""}
              disabled
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
                disabled
              />
              <label className="form-check-label">Seen</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="favourite"
                checked={movieData.favourite || false}
                disabled
              />
              <label className="form-check-label">Favourite</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="wishlist"
                checked={movieData.wishlist || false}
                disabled
              />
              <label className="form-check-label">Wishlist</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowMoviePage;
