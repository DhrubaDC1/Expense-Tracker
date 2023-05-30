const express = require("express"); // express is a framework for nodejs
const {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactionController"); // importing from transactionController

// router object
const router = express.Router();
// Express Routers are a way to organize your Express application such that your primary app. js file does not become bloated and difficult to reason about.

// routes
// add transaction || POST
router.post("/add-transaction", addTransaction);

// edit transaction || POST
router.post("/edit-transaction", editTransaction);

// delete transaction || POST
router.post("/delete-transaction", deleteTransaction);

// get transaction || POST
router.post("/get-transaction", getAllTransaction);

// exporting router
module.exports = router;
