import React from "react";
import ReactApexChart from "react-apexcharts";

function ApexChart2() {
  const state = {
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: 'donut',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      }],
    },
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-8">
          <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="donut" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApexChart2;
