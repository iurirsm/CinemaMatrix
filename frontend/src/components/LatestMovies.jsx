import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import MoviesTable from "./MoviesTable/MoviesTable";

function LatestMovies() {
  return (
    <section id="latestMovies" className="py-5">
      <div className="container">
        <h2 className="text-center mb-4">Your latest added movies</h2>

        <MoviesTable />
        <div className="text-center mt-3">
          <Link to="/movies">
            <Button variant="success">See All Movies</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LatestMovies;
