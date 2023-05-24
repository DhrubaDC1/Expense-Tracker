const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: [true, "item name is required"],
    },
    amount: {
      type: Number,
      required: [true, "item name is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    note: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const transactionModel = mongoose.model("transactions", transactionSchema);
