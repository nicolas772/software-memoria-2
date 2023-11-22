import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, Title } from "@tremor/react";

const GroupedStackedBar = () => {
   const series = [
      {
         name: 'Hombre Niño',
         group: 'Niños',
         data: [44, 55, 41],
      },
      {
         name: 'Mujer Niña',
         group: 'Niños',
         data: [44, 55, 41],
      },
      {
         name: 'No Informado Niño',
         group: 'Niños',
         data: [44, 55, 41],
      },
      {
         name: 'Hombre Adolescente',
         group: 'Adolescentes',
         data: [44, 55, 41],
      },
      {
         name: 'Mujer Adolescente',
         group: 'Adolescentes',
         data: [44, 55, 41],
      },
      {
         name: 'No Informado Adolescente',
         group: 'Adolescentes',
         data: [44, 55, 41],
      },
      {
         name: 'Hombre Joven',
         group: 'Jovenes',
         data: [44, 55, 41],
      },
      {
         name: 'Mujer Joven',
         group: 'Jovenes',
         data: [44, 55, 41],
      },
      {
         name: 'No Informado Joven',
         group: 'Jovenes',
         data: [44, 55, 41],
      },
      {
         name: 'Hombre Adulto',
         group: 'Adultos',
         data: [44, 55, 41],
      },
      {
         name: 'Mujer Adulta',
         group: 'Adultos',
         data: [44, 55, 41],
      },
      {
         name: 'No Informado Adulto',
         group: 'Adultos',
         data: [44, 55, 41],
      },
      {
         name: 'Hombre Adulto Mayor',
         group: 'Adulto Mayor',
         data: [44, 55, 41],
      },
      {
         name: 'Mujer Adulta Mayor',
         group: 'Adulto Mayor',
         data: [44, 55, 41],
      },
      {
         name: 'No Informado Adulto Mayor',
         group: 'Adulto Mayor',
         data: [44, 55, 41],
      },
   ];

   const options = {
      chart: {
         type: 'bar',
         height: 350,
         stacked: true,
      },
      stroke: {
         width: 1,
         colors: ['#fff'],
      },
      dataLabels: {
         formatter: (val) => {
            return val;
         },
      },
      plotOptions: {
         bar: {
            horizontal: false,
         },
      },
      xaxis: {
         categories: [
            'Iteracion 1',
            'Iteracion 2',
            'Iteracion 3'
         ],
      },
      fill: {
         opacity: 1,
      },
      colors: ['#28a745', '#28a745', '#28a745',
      '#ffc107', '#ffc107', '#ffc107',
      '#6f42c1', '#6f42c1', '#6f42c1',
      '#007bff', '#007bff', '#007bff',
      '#fd7e14', '#fd7e14', '#fd7e14'],
      yaxis: {
         labels: {
            formatter: (val) => {
               return val;
            },
         },
      },
      legend: {
         position: 'top',
         horizontalAlign: 'left',
         customLegendItems: ["Niños", "Adolescentes", "Jovenes", "Adultos", "Adulto Mayores"],
         markers: {
            fillColors: ['#28a745',
            '#ffc107',
            '#6f42c1',
            '#007bff',
            '#fd7e14'],
         }
         
      },
   };

   return (
      <Card>
         <Title>
            Usuarios por Género, Rango Etario e Iteración
         </Title>
         <ReactApexChart options={options} series={series} type="bar" height={350} />
      </Card>
   );
};

export default GroupedStackedBar;
