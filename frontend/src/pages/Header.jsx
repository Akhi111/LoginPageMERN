import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="h-12 bg-[#c0c1b7] flex space-x-5 items-center justify-center">
      <Link to="/">Home</Link>
      <Link to="/LogIn">LogIn</Link>
      <Link to="/SignUp">SignUp</Link>
      <Link to="/Profile">Profile</Link>
      {/* <Link onClick={handleLogout}>Logout</Link> */}
      <button className=" cursor-pointer text-black" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
