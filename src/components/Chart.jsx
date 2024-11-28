import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ data, title }) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  const filteredData = data.filter((item) => item.v !== null);
  
  const labels = filteredData.map((item) => new Date(item.t).toLocaleTimeString());
  const values = filteredData.map((item) => item.v);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: values,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)', 
        tension: 0.4, 
        fill: true, 
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default Chart;
