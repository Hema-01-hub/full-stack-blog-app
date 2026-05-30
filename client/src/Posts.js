import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function Posts() {
  // Store all posts
  const [posts, setPosts] = useState([]);

  // Store selected post id for editing
  const [editId, setEditId] = useState(null);

  // Store updated title
  const [editTitle, setEditTitle] = useState("");

  // Store updated content
  const [editContent, setEditContent] = useState("");

  // Fetch all posts
  const getPosts = async () => {
    const res = await axios.get("https://full-stack-blog-app-tgss.onrender.com");
    setPosts(res.data);
  };

  // Delete post
  const deletePost = async (id) => {
    const res = await axios.delete(`https://full-stack-blog-app-tgss.onrender.com/delete-post/${id}`);
    alert(res.data.message);
    getPosts();
  };

  // Start editing selected post
  const startEdit = (post) => {
    setEditId(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  // Update post
  const updatePost = async () => {
    const res = await axios.put(`https://full-stack-blog-app-tgss.onrender.com/update-post/${editId}`, {
      title: editTitle,
      content: editContent
    });

    alert(res.data.message);

    setEditId(null);
    setEditTitle("");
    setEditContent("");

    getPosts();
  };

  // Load posts when page opens
  useEffect(() => {
    getPosts();
  }, []);

  return (
  <>
    <Navbar />

    <div>
      <h2>All Blog Posts</h2>
      <h2>All Blog Posts</h2>

      {posts.map((post) => (
        <div key={post._id}>
          {editId === post._id ? (
            <div>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <br /><br />

              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />

              <br /><br />

              <button onClick={updatePost}>Save Update</button>
            </div>
          ) : (
            <div>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>Author: {post.author}</small>

              <br /><br />

              <button onClick={() => startEdit(post)}>Edit</button>
              <button onClick={() => deletePost(post._id)}>Delete</button>
            </div>
          )}

          <hr />
        </div>
      ))}
        </div>
  </>
  );
}

export default Posts;