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
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { ModiRecordedData } from '@src/lib/types/modi-data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface ChartComponentProps {
  cardData: ModiRecordedData;
  width?: number;
  height?: number;
}

const ChartImage = ({
  cardData,
  width = 184,
  height = 62,
}: ChartComponentProps) => {
  const chartData: ChartData<'line'> = {
    labels: cardData.data.map((item) =>
      new Date(item.date * 1000).toLocaleTimeString(),
    ),
    datasets: [
      {
        label: `${cardData.name} ${cardData.function}`,
        data: cardData.data.map((item) => item.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        borderWidth: 1.5,
        pointRadius: 0,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        min: cardData.min - 1.5,
        max: cardData.max + 1.5,
      },
    },
    animation: {
      duration: 0,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const containerStyles = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : '100%',
  };

  return (
    <div style={containerStyles}>
      <Line data={chartData} options={options} width={width} height={height} />
    </div>
  );
};

export default ChartImage;
