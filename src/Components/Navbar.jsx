import { Link, useNavigate } from "react-router-dom";
import "./CSS/navbar.css";
import { jwtDecode } from "jwt-decode";
import user from "../assets/user.png";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [profile, setProfile] = useState(false);

  const token = sessionStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : "Token Doesnt Exists";
  const navigate = useNavigate();

  const LinkStyles = {
    color: "#20263C",
    textDecoration: "none",
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  // Reference for the profile dropdown div
  const profileRef = useRef(null);

  useEffect(() => {
    // Function to close the profile dropdown when clicking outside of it
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfile(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <nav>
        <Link to="/" style={LinkStyles}>
          <p>მთავარი</p>
        </Link>
        <Link to="/Recipes" style={LinkStyles}>
          <p>რეცეპტები</p>
        </Link>
        <p>შენახულები</p>
        <p>დაგვიკავშირდით</p>
        {!token && (
          <>
            <Link to="/Register" style={LinkStyles}>
              <p>რეგისტრაცია</p>
            </Link>
            <Link to="/LogIn" style={LinkStyles}>
              <p>შესვლა</p>
            </Link>
          </>
        )}

        {token && (
          <div className="user-profile-container" ref={profileRef}>
            <img
              className="default-userimg"
              src={user}
              alt="default user image"
              onClick={() => setProfile(!profile)}
            />

            {profile && (
              <motion.div
                initial={{ opacity: 0, scale: 0}}
                animate={{ opacity: 1, scale: 1}}
                onClick={() => setProfile(false)}
                className="user-profile-navbar"
              >
                <p>{decoded.username}</p>
                <Link style={LinkStyles} to='/RecipesUpload'><p>რეცეპტის დამატება</p></Link>
                <p>პარამეტრები</p>
                <p>შენახულები</p>
                <p onClick={handleLogout}>გასვლა</p>
              </motion.div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
