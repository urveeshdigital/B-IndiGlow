import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartDashboard = () => {
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Users Gained',
        data: [100, 200, 300, 250, 400],
        backgroundColor: [
          'rgba(75,192,192,0.6)',
          'rgba(153,102,255,0.6)',
          'rgba(255,159,64,0.6)',
          'rgba(255,99,132,0.6)',
          'rgba(54,162,235,0.6)'
        ],
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,  // Important for custom sizing
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly User Growth' },
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div style={{ display: 'flex', gap: '40px', justifyContent: 'center' }}>
      <div style={{ width: '400px', height: '300px' }}>
        <Bar data={chartData} options={options} />
      </div>

      <div style={{ width: '400px', height: '300px' }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ChartDashboard;
