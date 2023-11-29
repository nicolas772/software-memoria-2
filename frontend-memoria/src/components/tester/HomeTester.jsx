import React, { useState, useEffect } from "react";
import DashboardService from "../../services/dashboard.service";
import ColumnChart from "../charts/ColumnChart";
import StackedBar from "../charts/StackedBar";
import MetricCard from "../charts/MetricCard";
import "../charts/css/styleDashboardPrincipal.css"
import { Grid } from "@tremor/react";
import { Form, Button, Nav } from 'react-bootstrap';
import UserService from "../../services/user.service";

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
          <h3>Home Tester</h3>
        </header>
      </div>
    </div>
  )
}

export default HomeTester

/*
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
            color="blue"
          ></MetricCard>
          <MetricCard
            metric={cardsContent.usuarios_participantes}
            title="Usuarios Totales"
            color="gray"
          ></MetricCard>
          <MetricCard
            metric={cardsContent.porc_iteraciones_completadas}
            title="% Iteraciones Completadas"
            color="emerald"
          ></MetricCard>
          <MetricCard
            metric={cardsContent.porc_estudios_completados}
            title="% Estudios Completados"
            color="amber"
          ></MetricCard>
        </Grid>
      </div>

      <div style={{ marginTop: "4%" }}>
        <div className="row">
          <div className="col-md-6">
            <div id="chart">
              <ColumnChart
                series={columnChartContent.series}
                categories={columnChartContent.software_names}
                chartTitle="Total Iteraciones por Estudio"
                titleYAxis="Cantidad Iteraciones"
              ></ColumnChart>
            </div>
          </div>
          <div className="col-md-6">
            <div id="chart">
              <StackedBar
                series={stackedBarContent.series}
                categories={stackedBarContent.studies}
                chartTitle="Cantidad de Usuarios por Estudio e Iteración"
                titleXAxis="Cantidad Usuarios"
              ></StackedBar>
            </div>
          </div>
        </div>
      </div>
      <div style={{ margin: "1%" }}>
        <div className="row">
          <div className="col-md-4">
            <div className="row">
              </div>
              <div className="row">
              </div>
            </div>
            <div className="col-md-8">
              <div id="chart">
              </div>
            </div>
  
          </div>
        </div>
  
      </div>
    )
*/