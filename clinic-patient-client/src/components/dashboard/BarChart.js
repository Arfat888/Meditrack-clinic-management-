import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Appointments",
        data: [5, 8, 6, 10, 7, 9, 4],
        backgroundColor: "rgba(0, 159, 253, 0.7)", // Theme blue
        borderRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: { position: "top" },
      title: { display: false }
    },
    scales: {
      y: {
        ticks: { stepSize: 2 }
      }
    }
  };

  return (
    <div className="chart-wrapper small-chart">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
