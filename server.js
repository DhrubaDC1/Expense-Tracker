const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");
const connectDb = require("./config/connectDb");
const userRoute = require("./routes/userRoute");

//config dot env file
dotenv.config();

// database call
connectDb();

//rest object
const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// user routes
app.use("/api/v1/users", userRoute);

// transaction routes
app.use("/api/v1/transactions", require("./routes/transactionRoutes"));

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//port
const PORT = process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
