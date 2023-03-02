const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer");
const path = require("path");
dotenv.config();
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/files");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res
      .status(200)
      .json({ status: "ok", message: "file uploaded successfully!" });
  } catch (error) {

    console.log("error coming in uploading file", err);
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(5000, () => {
  console.log("Backend server is running!");
});
