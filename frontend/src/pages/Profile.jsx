import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container py-5">
      <h1>Profile Page</h1>
      <p className="text-black">Welcome, {user.username}!</p>
      <p className="text-black">Email: {user.email}</p>
    </div>
  );
};

export default Profile;
