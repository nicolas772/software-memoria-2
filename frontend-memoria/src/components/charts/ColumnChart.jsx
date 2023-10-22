import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function ColumnChart(props) {
  const { content } = props;

  if (!content || !content.series || !content.xaxis_categories) {
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
        categories: content.xaxis_categories,
      },
      yaxis: {
        title: {
          text: "Cantidad Iteraciones",
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
    },
  };

  return (
    <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={300} />
  );
}

export default ColumnChart;
