import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function ColumnChart(props) {
  const { content, chartTitle } = props;

  if (!content || !content.series || !content.software_names) {
    return <p>Cargando gráfico...</p>;
  }

  const chartData = {
    series: content.series,
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: content.software_names,
      },
      yaxis: {
        title: {
          text: "Cantidad Iteraciones",
        },
        labels: {
          formatter: function (value) {
            return Math.floor(value); // Redondear los valores a números enteros
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      title: {
        text: chartTitle, // Título del gráfico
        align: "left", // Alineación del título (puede ser "left", "center" o "right")
      },
    },
  };

  return (
    <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={300} />
  );
}

export default ColumnChart;
