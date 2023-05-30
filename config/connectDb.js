const mongoose = require("mongoose"); // for using mongoDB
const colors = require("colors"); // for modifying colors

// async => Asynchronous programming is a technique that enables your program to start a potentially long-running task and still be able to be responsive to other events while that task runs, rather than having to wait until that task has finished
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // used to unwrap promises by passing a Promise as the expression
    console.log(`Server Running on ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`${error}`.bgRed);
  }
};

module.exports = connectDb;
