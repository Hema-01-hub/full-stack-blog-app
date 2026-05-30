import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  // Logout function
  const logout = () => {

    // Remove token
    localStorage.removeItem("token");

    // Redirect to login
    navigate("/login");
  };

  return (
    <div className="navbar">

      <h2>My Blog</h2>

      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
}

export default Navbar;