const express = require("express");

const app = express();

app.use(express.json());


// HOME ROUTE
app.get("/", (req, res) => {
  res.send("HOME WORKING");
});


// REGISTER ROUTE
app.post("/register", (req, res) => {
  res.send("REGISTER WORKING");
});


// LOGIN ROUTE
app.post("/login", (req, res) => {
  res.send("LOGIN WORKING");
});


// SERVER
app.listen(5001, () => {
  console.log("SERVER STARTED ON 5001");
});