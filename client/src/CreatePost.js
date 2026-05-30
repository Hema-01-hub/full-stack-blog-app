import { useState } from "react";
import axios from "axios";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = async () => {
    try {
      const res = await axios.post("https://full-stack-blog-app-tgss.onrender.com", {
        title,
        content,
        author: "Hema"
      });

      alert(res.data.message);
    } catch (err) {
      console.log(err);
      alert("Post creation failed ❌");
    }
  };

  return (
    <div className="container">
      <h2>Create Blog Post</h2>

      <input
        placeholder="Post Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Post Content"
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <button onClick={createPost}>Create Post</button>
    </div>
  );
}

export default CreatePost;