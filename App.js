const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://hemakrishnasree777_db_user:mongodbpwd@ac-f6wvfm5-shard-00-00.ejm4cq3.mongodb.net:27017,ac-f6wvfm5-shard-00-01.ejm4cq3.mongodb.net:27017,ac-f6wvfm5-shard-00-02.ejm4cq3.mongodb.net:27017/?ssl=true&replicaSet=atlas-7lrs6q-shard-0&authSource=admin&appName=myCluster")
    .then(() => console.log("MongoDB Connected ✅"))
    .catch((err) => console.error("MongoDB connection error ❌", err));

app.listen(5000, () => {
    console.log("Server running on port 3000");
});