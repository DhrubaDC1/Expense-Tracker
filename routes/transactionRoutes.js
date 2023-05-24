const express = require("express");
const { addTransaction, getAllTransaction } = require("../controllers/transactionController");

// router object
const router = express.Router();

//routes
// add transaction POST 
router.post('/add-transaction', addTransaction)

// get transaction GET
router.get('/get-transaction', getAllTransaction)

// export
module.exports = router;
