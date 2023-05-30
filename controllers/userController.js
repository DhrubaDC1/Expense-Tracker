const userModel = require("../models/userModel"); // importing userModel.js

// login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body; // importing email, password from body
    const user = await userModel.findOne({ email, password }); // finding user by email and password
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

// register callback
const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body); // creating new user using userModel
    await newUser.save(); // saving new user to database
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    // console.log("inside");
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//exporting functions
module.exports = { loginController, registerController };
