const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
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

// routes
// app.get("/", (req, res) => {
//   res.send("<h1>Hello from server</h1>");
// });
app.use("/api/v1/users", userRoute);

//port
const PORT = process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
