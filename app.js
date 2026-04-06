const express = require("express");
const mongoose = require("mongoose");
const routerPath = require("./routes/books");
const authersPath = require("./routes/auther")

// Conection To Database
mongoose
  .connect("mongodb://localhost/bookStoreDB")
  .then(() => console.log("Conected To MongoDB...."))
  .catch((error) => console.log("Concted Is False", error));
// init app
const app = express();
// apply middelware
app.use(express.json());

// Routes
app.use("/api/books", routerPath);
app.use("/api/authers", authersPath);

const PORT = 5000;

app.listen(PORT, () => console.log("server is running in port 5000"));
