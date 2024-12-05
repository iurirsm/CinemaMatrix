import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { PiStarLight, PiStarFill } from "react-icons/pi";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./MoviesTable.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function MoviesTable() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const fetchMovies = async () => {
    try {
      const response = await axios.get("/movies", {
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
    fetchMovies();
  }, []);

  const updateMovieStatus = async (movieId, field, value) => {
    try {
      const response = await axios.patch(
        `/movies/${movieId}`,
        { [field]: value },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Update the local state after successful update
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === movieId ? { ...movie, [field]: value } : movie
        )
      );
      console.log(response.data.message);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to update movie");
    }
  };

  // a trigger overlay for the icons
  const favoritesRenderTooltip = (props) => (
    <Tooltip id="fav-button-tooltip" {...props}>
      add to favorites
    </Tooltip>
  );

  const wishlistRenderTooltip = (props) => (
    <Tooltip id="wish-button-tooltip" {...props}>
      add to wishlist
    </Tooltip>
  );

  const seenRenderTooltip = (props) => (
    <Tooltip id="seen-button-tooltip" {...props}>
      add to watched
    </Tooltip>
  );

  const moviesToDisplay =
    location.pathname === "/homepage" ? movies.slice(-4) : movies;

  return (
    <section className="py-5">
      <div className="container">
        {error && <div className="alert alert-danger">{error}</div>}
        <Table responsive bordered className="custom-table ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Release Date</th>
              <th>type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {moviesToDisplay.length > 0 ? (
              moviesToDisplay.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.name}</td>
                  <td>
                    {Array.isArray(movie.director)
                      ? movie.director.join(", ")
                      : movie.director}
                  </td>
                  <td>{movie.genre}</td>
                  <td className="d-flex justify-content-center align-items-center gap-3">
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 50 }}
                      overlay={favoritesRenderTooltip}
                    >
                      <div
                        onClick={() =>
                          updateMovieStatus(
                            movie._id,
                            "favourite",
                            !movie.favourite
                          )
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {movie.favourite ? (
                          <GoHeartFill
                            style={{ fontSize: "1.5rem", color: "red" }}
                          />
                        ) : (
                          <GoHeart
                            style={{ fontSize: "1.5rem", color: "red" }}
                          />
                        )}
                      </div>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 50 }}
                      overlay={wishlistRenderTooltip}
                    >
                      <div
                        onClick={() =>
                          updateMovieStatus(
                            movie._id,
                            "wishlist",
                            !movie.wishlist
                          )
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {movie.wishlist ? (
                          <PiStarFill
                            style={{ fontSize: "1.5rem", color: "gold" }}
                          />
                        ) : (
                          <PiStarLight
                            style={{ fontSize: "1.5rem", color: "black" }}
                          />
                        )}
                      </div>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 50 }}
                      overlay={seenRenderTooltip}
                    >
                      <div
                        onClick={() =>
                          updateMovieStatus(movie._id, "seen", !movie.seen)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {movie.seen ? (
                          <FaRegEyeSlash
                            style={{ fontSize: "1.5rem", color: "green" }}
                          />
                        ) : (
                          <FaRegEye
                            style={{ fontSize: "1.5rem", color: "green" }}
                          />
                        )}
                      </div>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No movies available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </section>
  );
}

export default MoviesTable;
