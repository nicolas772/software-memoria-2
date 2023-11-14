import React, { useState, useEffect } from "react";
import { Grid, Col } from "@tremor/react";
import MetricCardList from "../../charts/MetricCardList";
import DashboardStudyService from '../../../services/dashboardStudy.service'
import BarChartGraphic from "../../charts/BarChartGraphic";

const DashboardGeneralStudy = (props) => {
  const { idStudy } = props
  const [cardsContent, setCardsContent] = useState("");
  const [stackedBarContent, setStackedBarContent] = useState("");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    DashboardStudyService.getCardsContentGeneral(idStudy).then(
      (response) => {
        setCardsContent(response.data)
        setLoading(false)
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
    DashboardStudyService.getStackedBarContentGeneral(idStudy).then(
      (response) => {
        setStackedBarContent(response.data);
        console.log(response.data)
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

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <div>
      <Grid numItemsSm={2} numItemsLg={4} className="gap-4">
        <MetricCardList content={cardsContent.total_iteraciones} color="amber" />
        <MetricCardList content={cardsContent.total_usuarios} color="emerald" />
        <Col numColSpan={2} numColSpanLg={2}>
          <BarChartGraphic 
          content={stackedBarContent.charData}
          color={stackedBarContent.colors}
          categories={stackedBarContent.categories}
          title="Tiempo Promedio por Iteración"/>
        </Col>
      </Grid>
    </div>
  );
}

export default DashboardGeneralStudy