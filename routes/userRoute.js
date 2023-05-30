const express = require("express"); // express is a framework for nodejs
const {
  loginController,
  registerController,
} = require("../controllers/userController"); // importing userController

// router object
const router = express.Router();
// Express Routers are a way to organize your Express application such that your primary app. js file does not become bloated and difficult to reason about.

// routers
// POST || LOGIN
router.post("/login", loginController);

// POST || REGISTER
router.post("/register", registerController);

// export router
module.exports = router;
