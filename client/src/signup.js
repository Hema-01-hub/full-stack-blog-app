import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const res = await axios.post("https://full-stack-blog-app-tgss.onrender.com/register", {
        username,
        email,
        password
      });

      alert(res.data.message);

      // Signup success ayyaka login page ki vellali
      navigate("/login");

    } catch (err) {
      console.log(err);
      alert("Signup Failed ❌");
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={registerUser}>Signup</button>
    </div>
  );
}

export default Signup;