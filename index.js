const express = require("express");

const app = express();// import routes
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const dashboardRoutes = require("./routes/dashboard");
const verifyToken = require("./routes/validate-token");
dotenv.config();
// connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log("connected to db")
    );
  
const authRoutes = require("./routes/auth");
app.use(express.json()); // for body parser

app.use("/api/user", authRoutes);
// this route is protected with token
app.use("/api/dashboard", verifyToken, dashboardRoutes);


app.listen(3000, () => console.log("server is running..."));