import React, { useState, useEffect } from "react";
import DashboardService from "../../services/dashboard.service";
import ColumnChart from "../charts/ColumnChart";
import ApexChart2 from "../charts/ApexChart2";
import ApexChart3 from "../charts/ApexChart3";
import StackedBar from "../charts/StackedBar";
import MetricCard from "../charts/MetricCard";
import Treemap from "../charts/Treemap";
import "../charts/css/styleDashboardPrincipal.css"
import { Grid } from "@tremor/react";

const HomeTester = () => {
  const [cardsContent, setCardsContent] = useState("");
  const [columnChartContent, setColumnChartContent] = useState("");
  const [stackedBarContent, setStackedBarContent] = useState("");

  useEffect(() => {
    DashboardService.getCardsContentMain().then(
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

  useEffect(() => {
    DashboardService.getColumnChartContentMain().then(
      (response) => {
        setColumnChartContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setColumnChartContent(_content);
      }
    );
  }, []);

  useEffect(() => {
    DashboardService.getStackedBarContentMain().then(
      (response) => {
        setStackedBarContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setStackedBarContent(_content);
      }
    );
  }, []);


  return (
    <div style={{ margin: '20px' }}>
      <div className="header-pages">
        <header>
          <h3>Dashboard Principal</h3>
        </header>
      </div>
      <div style={{ margin: "1%" }}>
        <Grid numItemsSm={2} numItemsLg={4} className="gap-4">
          <MetricCard
            metric={cardsContent.iteraciones_activas}
            title="Iteraciones Activas"
            color="indigo"
          ></MetricCard>
          <MetricCard
            metric={cardsContent.usuarios_participantes}
            title="Usuarios Totales"
            color="fuchsia"
          ></MetricCard>
          <MetricCard
            metric={cardsContent.porc_iteraciones_completadas}
            title="% Iteraciones Completadas"
            color="amber"
          ></MetricCard>
          <MetricCard
            metric={cardsContent.porc_estudios_completados}
            title="% Estudios Completados"
            color="emerald"
          ></MetricCard>
        </Grid>
      </div>

      <div style={{ marginTop: "4%" }}>
        <div className="row">
          <div className="col-md-6">
            <div id="chart">
              <ColumnChart content={columnChartContent} chartTitle="Total Iteraciones por Estudio"></ColumnChart>
            </div>
          </div>
          <div className="col-md-6">
            <div id="chart">
              <StackedBar content={stackedBarContent} chartTitle="Cantidad de Usuarios por Estudio e Iteración"></StackedBar>
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