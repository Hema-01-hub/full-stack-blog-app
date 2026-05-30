import { useNavigate } from "react-router-dom";

function Dashboard() {
  // Used to redirect pages
  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    // Remove JWT token from localStorage
    localStorage.removeItem("token");

    // Confirm token removed
    console.log("Token after logout:", localStorage.getItem("token"));

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome to Dashboard 🎉</h1>
      <h3>You are logged in successfully.</h3>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;