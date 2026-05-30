import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";
import Dashboard from "./Dashboard";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import "./blog.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;