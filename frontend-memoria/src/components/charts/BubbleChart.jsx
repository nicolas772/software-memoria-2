import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, Title } from "@tremor/react";

const generateData = (startTimestamp, count, options) => {
    const { min, max } = options;
    const series = [];
  
    for (let i = 0; i < count; i++) {
      const data = {
        x: `Iteración ${i + 1}`,
        y: Math.floor(Math.random() * (max - min + 1)) + min,
        z: Math.floor(Math.random() * (max - min + 1)) + min,
      };
  
      series.push(data);
    }
  
    return series;
  };

const BubbleChart = () => {
  const [chartState] = useState({
    series: [
      {
        name: 'Bubble1',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 3, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: 'Bubble2',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 3, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: 'Bubble3',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 3, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: 'Bubble4',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 3, {
          min: 10,
          max: 60,
        }),
      },
    ],
    options: {
        chart: {
          height: 350,
          type: 'bubble',
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          opacity: 0.8
        },
        xaxis: {
          tickAmount: 12,
          type: 'category',
          tickPlacement: 'between', // Ajusta la posición de las etiquetas
          
        },
        yaxis: {
          max: 70,
        }
      }
  });

  return (
    <Card>
      <Title>
        Usuarios por Género, Rango Etario e Iteración
      </Title>
      <ReactApexChart options={chartState.options} series={chartState.series} type="bubble" height={300} />
    </Card>
    
  );
};

export default BubbleChart;
