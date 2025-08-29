// src/components/dashboard/AppointmentsChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the chart elements
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AppointmentsChart = () => {
  // Dummy data for now
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Appointments',
        data: [20, 35, 40, 50, 60, 55, 70, 80], // Example numbers
        borderColor: '#009FFD',
        backgroundColor: 'rgba(0, 159, 253, 0.2)',
        tension: 0.3,
        fill: true,
        pointRadius: 5
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Appointments' }
    }
  };

  return (
    <div style={{ background: 'white', padding: '16px', borderRadius: '10px', boxShadow: '0 6px 18px rgba(10,40,80,0.04)', marginBottom: '20px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default AppointmentsChart;
