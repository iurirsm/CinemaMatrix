import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import HeroSection from "../components/HeroSection/HeroSection";
import LoginPage from "./LoginPage";
import LatestMovies from "../components/LatestMovies"


const Homepage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {/* <h1>CinemaMatrix Homepage</h1> */}
      {/* Show a personalized welcome message if logged in */}
      {user ? (
        <>

          <HeroSection />
          <LatestMovies />
        </>
      ) : (
        <>
          <h2>You have to login first</h2>
          <LoginPage />
        </>
      )}
    </div>
  );
};

export default Homepage;
