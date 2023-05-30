import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend); // registering for chart

const Analytics = ({ allTransaction }) => {
  // for calculating amount of transactions
  const totalAmount = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  // for calculating amount of different categories
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

  // data for pie chart
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
  return (
    <>
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

// exporting Analytics functions
export default Analytics;
