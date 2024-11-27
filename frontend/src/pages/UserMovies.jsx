import React from "react";
import MoviesTable from "../components/MoviesTable/MoviesTable";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function UserMovies() {
  return (
    <>
      <div className="container py-5">
        <div className="d-flex justify-content-between">
          <h2>Your Movies</h2>
          <Link to="/dashboard">
            <Button variant="success">Add new movie</Button>
          </Link>
        </div>

        <MoviesTable />
      </div>
    </>
  );
}

export default UserMovies;
