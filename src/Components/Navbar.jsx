import { Link, useNavigate } from "react-router-dom";
import "./CSS/navbar.css";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
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
        {!decoded && (
          <>
            <Link to="/Register" style={LinkStyles}>
              <p>რეგისტრაცია</p>
            </Link>
            <Link to="/LogIn" style={LinkStyles}>
              <p>შესვლა</p>
            </Link>
          </>
        )}

        {decoded && (
          <>
            <p>გამარჯობა, {decoded.username}</p>
            <p onClick={handleLogout}>გასვლა</p>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
