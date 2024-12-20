// src/App.jsx
// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
// import PrivateRoute from "./components/PrivateRoute";
import Navigation from "./components/Navigation/navigation";
import Profile from "./pages/Profile";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import UserMovies from "./pages/UserMovies";
import AddMoviePage from "./pages/AddMoviePage";
import EditMoviePage from "./pages/EditMoviePage";
import ShowMoviePage from "./pages/ShowMoviePage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/movies" element={<UserMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/add-movie" element={<AddMoviePage />} />
          <Route path="/edit-movie/:id" element={<EditMoviePage />} />
          <Route path="/show-movie/:id" element={<ShowMoviePage />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
