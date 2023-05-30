const moment = require("moment"); // used to format date & time
const transactionModel = require("../models/transactionModel"); // used to import transactionModel.js

// get all transaction
const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate } = req.body; // importing frequency, selectedDate from body
    const transactions = await transactionModel.find({
      ...(frequency !== "custom" //if not custom
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(), // difference of frequency and current date
            },
          }
        : {
            // if custom
            date: {
              // difference between selected range of date
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid, // request body of current user
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// delete selected transaction
const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transactionId }); // find the transaction and delete
    res.status(200).send("Deleted Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// edit selected transaction
const editTransaction = async (req, res) => {
  try {
    // find the transaction and update
    await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.status(200).send("Updated Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// add new transaction
const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body); // create new transaction using transactionModel
    await newTransaction.save(); // save the transaction to database
    res.status(201).send("Expense Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// exporting funsctions
module.exports = {
  getAllTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
