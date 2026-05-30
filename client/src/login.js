import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginUser = async () => {
    try {
      const res = await axios.post("https://full-stack-blog-app-tgss.onrender.com", {
        email,
        password
      });
      // Save JWT Token
      localStorage.setItem("token", res.data.token);

      alert(res.data.message);
      navigate("/dashboard");

      console.log("TOKEN:", res.data.token);

    } catch (err) {
      console.log(err);
      alert("Login Failed ❌");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={loginUser}>
        Login
      </button>
    </div>
  );
}

export default Login;