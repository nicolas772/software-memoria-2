import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, Title } from "@tremor/react";

const PieChart = (props) => {
   const {title, color, content} = props
   const [chartState] = useState({
      series: content.series,
      options: {
         chart: {
            width: 350,
            type: 'pie',
         },
         labels: content.labels,
         colors: content.colors, 
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
