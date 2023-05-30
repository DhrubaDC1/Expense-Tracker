const mongoose = require("mongoose"); // for using mongoDB functions

const transactionSchema = new mongoose.Schema( // for creating schema for user
  {
    userid: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    item: {
      type: String,
      required: [true, "item name is required"],
    },
    amount: {
      type: Number,
      required: [true, "amount name is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    date: {
      type: Date,
      required: [true, "date is required"],
    },
    note: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// exporting functions
const transactionModel = mongoose.model("transactions", transactionSchema);
module.exports = transactionModel;
