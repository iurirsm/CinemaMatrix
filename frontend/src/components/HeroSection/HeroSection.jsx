import React from "react";
import HeroImage from "../../assets/HeroImage.png";
import "./HeroSection.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function HeroSection() {
  return (
    <div className="hero-container position-relative text-center">
      <img
        src={HeroImage}
        alt="Hero Background"
        className="hero-image img-fluid"
      />
      <div className="hero-overlay position-absolute top-50 start-50 translate-middle p-5">
        <h1 className="hero-title text-white mb-4">Welcome to Cinema Matrix</h1>
        <p className="text-white mb-4">
          Cinema Matrix is your go-to platform for exploring, reviewing, and
          discovering amazing movies.
        </p>
        {/* <div className="d-flex justify-content-center align-items-center input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search for movies..."
            aria-label="Search"
          />
          <button className="btn btn-success" type="button">
            Search
          </button>
        </div> */}
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button
            variant="success"
            onClick={() => {
              document
                .getElementById("latestMovies")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            see more
          </Button>
          <Link to="/dashboard">
            <button className="btn btn-success">go to the Dashboard</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
