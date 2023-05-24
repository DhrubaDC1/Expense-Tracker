const userModel = require("../models/userModel");

// login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
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
  //   const { name, email, password } = req.body;

  //   let emptyFields = []

  //   if(!name) {
  //     emptyFields.push('name')
  //   }
  //   if(!email) {
  //     emptyFields.push('email')
  //   }
  //   if(!password) {
  //     emptyFields.push('password')
  //   }
  //   if(emptyFields.length > 0){
  //     return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
  //   }
  //   try {
  //     const userM = await userModel.create({ name, email, password });
  //     res.status(200).json(userM);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // };
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
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

//export
module.exports = { loginController, registerController };
