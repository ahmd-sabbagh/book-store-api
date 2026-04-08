const express = require("express");
const mongoose = require("mongoose");
const routerPath = require("./routes/books");
const authersPath = require("./routes/auther");
const authPath = require("./routes/auth");
const dotenv = require("dotenv");

dotenv.config();

// Conection To Database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Conected To MongoDB...."))
  .catch((error) => console.log("Concted Is False", error));
// init app
const app = express();
// apply middelware
app.use(express.json());
// Routes
app.use("/api/books", routerPath);
app.use("/api/authers", authersPath);
app.use("/api/auth", authPath);

// 404 handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Error handler middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    // stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = 5000;

app.listen(PORT, () => console.log("server is running in port 5000"));
