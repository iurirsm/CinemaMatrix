import MovieList from "../components/MovieList";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";

const Dashboard = () => {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2>manage your movies</h2>
        <Link to="/add-movie">
          <button className="btn btn-success">Add new movie</button>
        </Link>
      </div>
      <Tabs
        defaultActiveKey="all-movies"
        id="justify-tab-example"
        className="mb-3 mt-5 "
        justify
        variant="underline"
        style={{
          "--bs-nav-link-color": "darkgreen",
          "--bs-nav-link-font-weight": "bold",
        }}
      >
        <Tab eventKey="all-movies" title="All Movies">
          <MovieList status="all" />
        </Tab>
        <Tab eventKey="favorites" title="Favorites">
          <MovieList status="favorites" />
        </Tab>
        <Tab eventKey="wishlist" title="Wishlist">
          <MovieList status="wishlist" />
        </Tab>
        <Tab eventKey="watched" title="Watched">
          <MovieList status="watched" />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Dashboard;
