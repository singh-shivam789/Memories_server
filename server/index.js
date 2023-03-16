const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const path = require("path");
dotenv.config();
const PORT = process.env.PORT || 5000;
let username = encodeURIComponent("shivamsingh_99");
let password = encodeURIComponent("singh@123");
mongoose
  .connect(
    `mongodb+srv://${username}:${password}@devcluster1.2bfcye7.mongodb.net/socialDB?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/files", express.static(path.join(__dirname, "public/files")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
  return res.status(200).json({"message" : "This is Memories backend server"});
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(PORT, () => {
  console.log("Backend server is running!");
});
