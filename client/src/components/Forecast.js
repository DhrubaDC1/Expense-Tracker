import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Forecast = () => {
  const data = {
    labels: ["Mon", "Tues", "Wed"],
    datasets: [
      {
        label: "369",
        data: [3, 6, 9],
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
  const options = {};
  return (
    <>
      <div>
        <Bar>
          data = {data}
          options = {options}
        </Bar>
      </div>
    </>
  );
};

export default Forecast;
