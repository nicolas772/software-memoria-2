import React, { useState, useEffect } from "react";
import DashboardService from "../../services/dashboard.service";
import ColumnChart from "../charts/ColumnChart";
import ApexChart2 from "../charts/ApexChart2";
import ApexChart3 from "../charts/ApexChart3";
import ApexChart4 from "../charts/ApexChart4";
import Cards from "../charts/Cards";
import Treemap from "../charts/Treemap";
import "../charts/css/styleDashboardPrincipal.css"

const HomeTester = () => {
  const [cardsContent, setCardsContent] = useState("");

  useEffect(() => {
    DashboardService.getCardsContentPrincipal().then(
      (response) => {
        setCardsContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setCardsContent(_content);
      }
    );
  }, []);

  return (
    <div style={{ margin: '20px' }}>
      <header>
        <h3>Dashboard Principal</h3>
      </header>
      <div style={{ margin: "1%" }}>
        <Cards content={cardsContent}></Cards>
      </div>

      <div style={{ marginTop: "5%" }}>
        <div className="row">
          <div className="col-md-6">
            <div id="chart">
              <ColumnChart></ColumnChart>
            </div>
          </div>
          <div className="col-md-6">
            <div id="chart">
              {/*<ApexChart4></ApexChart4>*/}
            </div>
          </div>
        </div>
      </div>
      <div style={{ margin: "1%" }}>
        <div className="row">
          <div className="col-md-4">
            <div className="row">
              {/*<ApexChart2></ApexChart2>*/}
            </div>
            <div className="row">
              {/*<ApexChart2></ApexChart2>*/}
            </div>
          </div>
          <div className="col-md-8">
            <div id="chart">
              {/*<Treemap />*/}
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default HomeTester