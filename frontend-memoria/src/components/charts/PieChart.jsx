import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, Title } from "@tremor/react";

const PieChart = (props) => {
   const {title, color} = props
   const [chartState] = useState({
      series: [44, 55, 13],
      options: {
         chart: {
            width: 350,
            type: 'pie',
         },
         labels: ['Fácil', 'Medio', 'Difícil'],
         colors: ['#28a745', '#ffc108', '#dc3545'], 
         responsive: [
            {
               breakpoint: 480,
               options: {
                  chart: {
                     width: 200,
                  },
                  legend: {
                     position: 'top',
                  },
               },
            },
         ],
      },
   });

   return (
      <Card
      decoration="top"
      decorationColor={color}>
         <Title className='mb-2'>{title}</Title>
         <ReactApexChart options={chartState.options} series={chartState.series} type="pie" width={350} />
      </Card>
   );
};

export default PieChart;
