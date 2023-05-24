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
      enum: [
        "Food",
        "Transportation",
        "Utilities",
        "Housing",
        "Insurance",
        "Medical & Healthcare",
        "Bank payments",
        "Personal Spending",
        "Entertainment",
        "Miscellaneous",
      ],
      required: [true, "category is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    note: {
      type: String,
      required: false,
    },
  },
  { timestamps }
);

const transactionModel = mongoose.model("transactions", transactionSchema);
