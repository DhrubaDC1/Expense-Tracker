const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
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

const transactionModel = mongoose.model("transactions", transactionSchema);
module.exports = transactionModel;
