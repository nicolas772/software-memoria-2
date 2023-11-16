import React, { useState, useEffect } from "react";
import { Grid, Col } from "@tremor/react";
import MetricCardList from "../../charts/MetricCardList";
import TableDashGeneralIteration from "../../tables/TableDashGeneralIteration";
import DashboardIterationService from '../../../services/dashboardIteration.service'
import PieChart from "../../charts/PieChart";

export default function DashboardGeneralIteration(props) {
  const { idIteration } = props;
  const [cardsContent, setCardsContent] = useState("");
  const [tableTimeContent, setTableTimeContent] = useState("");
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)

  useEffect(() => {
    DashboardIterationService.getCardsContentGeneral(idIteration).then(
      (response) => {
        setCardsContent(response.data)
        setLoading1(false)
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
    DashboardIterationService.getTableTimeContentGeneral(idIteration).then(
      (response) => {
        setTableTimeContent(response.data)
        setLoading2(false)
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

  

  if (loading1 || loading2) {
    return <div>Cargando...</div>
  }
  return (
    <div>
      <Grid numItemsSm={2} numItemsLg={4} className="gap-4">
        <MetricCardList content={cardsContent.tiempo_promedio} color="amber" />
        <MetricCardList content={cardsContent.tareas_completadas} color="amber" />
        <Col numColSpan={2} numColSpanLg={2}>
          <PieChart />
        </Col>
        <Col numColSpan={2} numColSpanLg={2}>
          <TableDashGeneralIteration content = {tableTimeContent} />
        </Col>
      </Grid>
    </div>
  );
}