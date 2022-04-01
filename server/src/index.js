const express = require("express");
const cors = require("cors");

const app = express();

const galleryRoute = require("./routes/gallery");

app.use(cors());

app.use("/api", galleryRoute);

module.exports = app;
