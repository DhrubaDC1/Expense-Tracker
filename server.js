const express = require("express"); // express is a framework for nodejs
const cors = require("cors"); // for cross-origin requests and data transfer
const morgan = require("morgan"); // simplifies the process of logging requests to application
const dotenv = require("dotenv"); // for using .env file without breaking security
const colors = require("colors"); // for modifying colors
const path = require("path"); // for handling and transforming file paths.
const connectDb = require("./config/connectDb"); // for using connectDb.js file inside server.js
const userRoute = require("./routes/userRoute"); //// for using userRoute.js file inside server.js

//config dot env file
dotenv.config();

// database call
connectDb();

// rest object
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
