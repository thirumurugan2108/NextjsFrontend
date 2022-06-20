import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  aspectRatio: 1,
  plugins: {
    title: {
      display: false,
      text: '',
    },
    legend: {
      display: true,
      position: "bottom"
    }
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};





const ChartRender = ({data: {labels ='', cardsData=[], imageData=[], videoData = [], subscriptionData=[]}})  => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Images',
        data: imageData,
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Videos',
        data: videoData,
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Cards',
        data: cardsData,
        backgroundColor: 'rgb(53, 162, 235)',
      },
      {
        label: 'Subscriptions',
        data: subscriptionData,
        backgroundColor: 'rgb(50, 102, 235)',
      },
    ],
  };
  //console.log(chartData)
  return <Bar options={options} data={chartData} />
}

export default ChartRender
