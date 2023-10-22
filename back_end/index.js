// External imports
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

//Internal imports
const connectDB = require("./cofigure/connectdb");
const userRouter = require("./routes/User.route");
const postRouter = require("./routes/Post.route");
const catagoryRouter = require("./routes/Catagory.route");

//dotenv configure
require("dotenv").config();

//  app create using express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

//static path for images
//app.use("/images", express.static("images"));
const imgPath = path.join(__dirname, "images");

app.use("/images", express.static(imgPath));
console.log(__dirname);
console.log("imgPath");
console.log(imgPath);
//image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/uploads", upload.single("file"), (req, res) => {
  res.status(200).json({
    result: "Successful",
    message: "File has been uploaded successfully.",
  });
  console.log("image.req.file from index backend");
  console.log(req.file);
});

//Rest Api
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/catagory", catagoryRouter);

// Server content
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Moments Chronicles");
});

// // 404 error route
// app.use((req, res, next) => {
//   res.status(404).send("404 Error...!");
// });

// // Server Error
// app.use((err, req, res, next) => {
//   res.status(500).send("Something broke, Server Error...!");
// });

//Port
const port = process.env.PORT || 5000;

//App listen for server running
app.listen(port, async () => {
  console.log(`Server is listening at http://localhost:${port}`);
  await connectDB();
});
