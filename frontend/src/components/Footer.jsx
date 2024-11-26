import React from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-dark bg-gradient text-light mt-auto pt-5">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4 mb-3">
            <img
              src={logo}
              alt="Logo"
              className="img-fluid mb-3"
              style={{ maxWidth: "120px" }}
            />
          </div>
          <div className="col-md-4 mb-3">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/homepage"
                  className="text-decoration-none text-light"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-decoration-none text-light"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-decoration-none text-light">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h6>Follow Us</h6>
            <div className="d-flex justify-content-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <p className="mb-0">&copy; 2024 MERN Marvels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
