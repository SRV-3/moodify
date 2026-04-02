const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors());

/*
 *routes
 */
const authRoutes = require("./routes/auth.routes");
const songRoutes = require("./routes/song.routes");

app.use("/api/auth", authRoutes);
app.use("/api/song", songRoutes);

app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;
