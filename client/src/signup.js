import { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      const res = await axios.post("https://full-stack-blog-app-tgss.onrender.com", {
        username,
        email,
        password
      });

      alert(res.data.message);
    } 
catch (err) {
  console.log("ERROR:", err);
  console.log("MESSAGE:", err.message);
  console.log("RESPONSE:", err.response);
  console.log("REQUEST:", err.request);
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