require("dotenv").config();
require("./config/db");

const path = require("path");
const express = require("express");
const cors = require("cors");

const phoneRoutes = require("./routes/phoneRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(cors());

app.use(express.json());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use("/api/phones", phoneRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req,res)=>{

    res.send("CellSense AI API Running");

});

app.listen(process.env.PORT,()=>{

    console.log("Server running");

});