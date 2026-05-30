const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();

// app.use(cors());
// app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002","https://full-stack-blog-app-beta.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
const JWT_SECRET=process.env.JWT_SECRET;
// MONGODB CONNECT
mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});
// USER SCHEMA
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});
// USER MODEL
const User = mongoose.model("User", userSchema);
// HOME ROUTE
app.get("/", (req, res) => {
  res.send("HOME WORKING ✅");
});
app.get("/test-post", (req, res) => {
  res.send("POST ROUTE TEST WORKING");
});
// REGISTER ROUTE
app.post("/register", async (req, res) => {
  try {
    console.log("REGISTER HIT");
    console.log(req.body);

    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.json({
      message: "REGISTER SUCCESS ✅"
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// LOGIN ROUTE
app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: "User not found ❌" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({ message: "Wrong password ❌" });
  }

  // 👉 CREATE TOKEN HERE
  const token = jwt.sign(
    { id: user._id, email: user.email },
     JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "LOGIN SUCCESS ✅",
    token: token
  });

});
// LOGIN ROUTE
app.post("/login", async (req, res) => {
  // login code
});

// JWT VERIFY MIDDLEWARE 👈 Ikkada add cheyyi
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "No token provided ❌"
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({
      message: "Invalid token ❌"
    });
  }
};

// POST SCHEMA 👇
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String
});
const Post = mongoose.model("Post", postSchema);
//post blog
app.post("/create-post", verifyToken, async (req, res) =>  {
  try {
    console.log("CREATE POST HIT");
    console.log(req.body);

    const { title, content, author } = req.body;

    const newPost = new Post({
      title,
      content,
      author
    });

    await newPost.save();

    res.json({
      message: "Post Created Successfully ✅"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    });
  }
});
//view all posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// DELETE POST ROUTE
app.delete("/delete-post/:id", verifyToken, async (req, res) =>  {
  try {
    const postId = req.params.id;

    await Post.findByIdAndDelete(postId);

    res.json({
      message: "Post Deleted Successfully ✅"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    });
  }
});
// UPDATE POST ROUTE
app.put("/update-post/:id", verifyToken, async (req, res) =>  {
  try {
    // Get post id from URL
    const postId = req.params.id;

    // Get updated data from frontend
    const { title, content } = req.body;

    // Update post in MongoDB
    await Post.findByIdAndUpdate(postId, {
      title: title,
      content: content
    });

    // Send success response
    res.json({
      message: "Post Updated Successfully ✅"
    });

  } catch (err) {
    // Print error in terminal
    console.log(err);

    // Send error response
    res.status(500).json({
      message: err.message
    });
  }
});
// START SERVER
app.listen(5001, () => {
  console.log("SERVER STARTED ON 5001");
});