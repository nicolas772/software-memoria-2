import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function StackedBar(props) {
  const { chartTitle, content } = props;
  if (!content || !content.series || !content.studies) {
    return <p>Cargando gráfico...</p>;
  }
  
  const chartData = {
    series: content.series,
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: '13px',
                fontWeight: 900
              }
            }
          }
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: chartTitle
      },
      xaxis: {
        categories: content.studies,
        labels: {
          formatter: function (val) {
            return Math.round(val); // Redondear el valor a un número entero
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " usuarios"
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    }
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={chartData.options.chart.height}
      />
    </div>
  );
}

export default StackedBar;
