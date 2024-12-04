import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineOpenInFull } from "react-icons/md";
import { Link } from "react-router-dom";

const MovieList = ({ status }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const { user, loading: authLoading } = useContext(AuthContext);

  // Fetch movies
  const fetchMovies = async () => {
    try {
      let url = "http://localhost:3000/movies"; // Default URL for all movies
      if (status === "favorites")
        url = "http://localhost:3000/movies/status/favourite";
      else if (status === "wishlist")
        url = "http://localhost:3000/movies/status/wishlist";
      else if (status === "watched")
        url = "http://localhost:3000/movies/status/seen";

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setMovies(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch movies");
      console.error(err);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchMovies(); // Fetch movies only if not in loading state
    }
  }, [status, authLoading]); // Dependency on authLoading to trigger fetching when it's ready

  // Handle movie deletion with confirmation
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:3000/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      fetchMovies(); // Refresh the movie list after deletion
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete movie");
      console.error(err);
    }
  };

  // a trigger overlay for the icons
  const editRenderTooltip = (props) => (
    <Tooltip id="fav-button-tooltip" {...props}>
      edit movie
    </Tooltip>
  );

  const deleteRenderTooltip = (props) => (
    <Tooltip id="wish-button-tooltip" {...props}>
      delete movie
    </Tooltip>
  );

  const showRenderTooltip = (props) => (
    <Tooltip id="seen-button-tooltip" {...props}>
      show movie information
    </Tooltip>
  );

  return (
    <div className="mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <Table responsive className="table custom-table" bordered>
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
              <td>
                {Array.isArray(movie.director)
                  ? movie.director.join(", ")
                  : movie.director}
              </td>
              <td>{movie.genre}</td>
              <td>
                <div className="d-flex justify-content-center align-items-center gap-3">
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 50 }}
                    overlay={editRenderTooltip}
                  >
                    <Link to={`/edit-movie/${movie._id}`}>
                      <CiEdit style={{ fontSize: "1.5rem", color: "green" }} />
                    </Link>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 50 }}
                    overlay={deleteRenderTooltip}
                  >
                    <div onClick={() => handleDelete(movie._id)}>
                      <AiOutlineDelete
                        style={{ fontSize: "1.5rem", color: "red" }}
                      />
                    </div>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 50 }}
                    overlay={showRenderTooltip}
                  >
                    <Link to={`/show-movie/${movie._id}`}>
                      <MdOutlineOpenInFull
                        style={{ fontSize: "1.5rem", color: "gray" }}
                      />
                    </Link>
                  </OverlayTrigger>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MovieList;
