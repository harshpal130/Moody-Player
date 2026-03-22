const express = require("express");
const songRoutes = require("./routes/song.route.js")
const cors = require("cors")

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));
app.use(express.json())




app.use('/songs', songRoutes)  //  isko is lay use kiye hai jisse express ko pata chle kuch aur api create hue hai 

// app.use("/songs", require("./routes/song.route"));



module.exports = app;
