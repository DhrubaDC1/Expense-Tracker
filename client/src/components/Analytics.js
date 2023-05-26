// import { Progress } from "antd";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Analytics = ({ allTransaction }) => {
  // for amount of transactions
  const totalAmount = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const foodAmount = allTransaction
    .filter((transaction) => transaction.category === "Food")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const transportationAmount = allTransaction
    .filter((transaction) => transaction.category === "Transportation")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const utilitiesAmount = allTransaction
    .filter((transaction) => transaction.category === "Utilities")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const housingAmount = allTransaction
    .filter((transaction) => transaction.category === "Housing")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const insuranceAmount = allTransaction
    .filter((transaction) => transaction.category === "Insurance")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const medicalAmount = allTransaction
    .filter((transaction) => transaction.category === "Medical & Healthcare")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const bankAmount = allTransaction
    .filter((transaction) => transaction.category === "Bank payments")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const personalAmount = allTransaction
    .filter((transaction) => transaction.category === "Personal Spending")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const entertainmentAmount = allTransaction
    .filter((transaction) => transaction.category === "Entertainment")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const miscellaneousAmount = allTransaction
    .filter((transaction) => transaction.category === "Miscellaneous")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  // For number of transactions
  //   const totalTransaction = allTransaction.length;
  //   const foodExpense = allTransaction.filter(
  //     (transaction) => transaction.category === "Food"
  //   );
  //   const transportationExpense = allTransaction.filter(
  //     (transaction) => transaction.category === "Transportation"
  //   );
  //   const utilitiesExpense = allTransaction.filter(
  //     (transaction) => transaction.category === "Utilities"
  //   );
  //   const housingExpense = allTransaction.filter(
  //     (transaction) => transaction.category === "Housing"
  //   );
  //   const insuranceExpense = allTransaction.filter(
  //     (transaction) => transaction.category === "Insurance"
  //   );
  //   const medicalExpense = allTransaction.filter(
  //     (transaction) => transaction.category === "Medical & Healthcare"
  //   );
  //   const bankExpense = allTransaction.filter(
  //     (transaction) => transaction.category === "Bank payments"
  //   );
  //   const personalExpense = allTransaction.filter(
  //     (transaction) => transaction.category === "Personal Spending"
  //   );
  //   const entertainmentExpense = allTransaction.filter(
  //     (transaction) => transaction.category === "Entertainment"
  //   );
  //   const miscellaneousExpense = allTransaction.filter(
  //     (transaction) => transaction.category === "Miscellaneous"
  //   );

  //   const foodExpensePercent = (foodExpense / totalTransaction) * 100;
  //   const transportationExpensePercent =
  //     (transportationExpense / totalTransaction) * 100;
  //   const utilitiesExpensePercent = (utilitiesExpense / totalTransaction) * 100;
  //   const housingExpensePercent = (housingExpense / totalTransaction) * 100;
  //   const insuranceExpensePercent = (insuranceExpense / totalTransaction) * 100;
  //   const medicalExpensePercent = (medicalExpense / totalTransaction) * 100;
  //   const bankExpensePercent = (bankExpense / totalTransaction) * 100;
  //   const personalExpensePercent = (personalExpense / totalTransaction) * 100;
  //   const entertainmentExpensePercent =
  //     (entertainmentExpense / totalTransaction) * 100;
  //   const miscellaneousExpensePercent =
  //     (miscellaneousExpense / totalTransaction) * 100;

  const data = {
    labels: [
      "Housing",
      "Transportation",
      "Utilities",
      "Food",
      "Insurance",
      "Medical & Healthcare",
      "Bank payments",
      "Personal Spending",
      "Entertainment",
      "Miscellaneous",
    ],
    datasets: [
      {
        data: [
          housingAmount,
          transportationAmount,
          utilitiesAmount,
          foodAmount,
          insuranceAmount,
          medicalAmount,
          bankAmount,
          personalAmount,
          entertainmentAmount,
          miscellaneousAmount,
        ],
        backgroundColor: [
          "#9e0142",
          "#d53e4f",
          "#f46d43",
          "#fdae61",
          "#fee08b",
          "#e6f598",
          "#abdda4",
          "#66c2a5",
          "#3288bd",
          "#5e4fa2",
        ],
        borderColor: [
          "#9e0142",
          "#d53e4f",
          "#f46d43",
          "#fdae61",
          "#fee08b",
          "#e6f598",
          "#abdda4",
          "#66c2a5",
          "#3288bd",
          "#5e4fa2",
        ],
      },
    ],
  };
  //   //   const options = {
  //             elements: {
  //                 center: {
  //                   text: "Spent per Category",
  //                   color: "#FF6384", // Default is #000000
  //                   fontStyle: "Arial", // Default is Arial
  //                   sidePadding: 20, // Default is 20 (as a percentage)
  //                   minFontSize: 25, // Default is 20 (in px), set to false and text will not wrap.
  //                   lineHeight: 25, // Default is 25 (in px), used for when text wraps
  //                 },
  //               },
  //             };

  // const total
  //   categories
  //     const categories = [
  //       "Food",
  //       "Transportation",
  //       "Utilities",
  //       "Housing",
  //       "Insurance",
  //       "Medical & Healthcare",
  //       "Bank payments",
  //       "Personal Spending",
  //       "Entertainment",
  //       "Miscellaneous",
  //     ];
  return (
    <>
      {/* <div className="row m-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Expenses: {totalTransaction}
            </div>
            <div className="card-body">
              <h5>Food: {foodExpense.length}</h5>
              <h5>Transportation: {transportationExpense.length}</h5>
              <h5>Utilities: {utilitiesExpense.length}</h5>
              <h5>Housing: {housingExpense.length}</h5>
              <h5>Insurance: {insuranceExpense.length}</h5>
              <h5>Medical & Healthcare: {medicalExpense.length}</h5>
              <h5>Bank payments: {bankExpense.length}</h5>
              <h5>Personal Spending: {personalExpense.length}</h5>
              <h5>Entertainment: {entertainmentExpense.length}</h5>
              <h5>Miscelleaneous: {miscellaneousExpense.length}</h5>
            </div>
          </div>
        </div>
      </div> */}
      <div style={{ width: "30%" }} className="container-fluid">
        <center>
          <h2>Expenditure per Category</h2>
        </center>
        <Doughnut data={data}></Doughnut>
      </div>
      <div className="container-fluid" style={{ margin: 20 }}>
        <center>
          <h2>Total Expenditure: {totalAmount} tk</h2>
        </center>
      </div>
    </>
  );
};

export default Analytics;
