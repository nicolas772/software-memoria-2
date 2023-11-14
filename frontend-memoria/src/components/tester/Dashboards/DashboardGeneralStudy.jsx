import React, { useState, useEffect } from "react";
import { Grid, Col } from "@tremor/react";
import MetricCardList from "../../charts/MetricCardList";
import DashboardStudyService from '../../../services/dashboardStudy.service'
import BarChartGraphic from "../../charts/BarChartGraphic";
import BarListGraphic from "../../charts/BarListGraphic";

const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

const DashboardGeneralStudy = (props) => {
  const { idStudy } = props
  const [cardsContent, setCardsContent] = useState("");
  const [barListContent, setBarListContent] = useState("");
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
    DashboardStudyService.getBarListContentGeneral(idStudy).then(
      (response) => {
        setBarListContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setBarListContent(_content);
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
          <BarListGraphic 
          content={barListContent.charData}
          valueFormatter={formatTime} 
          title="Tiempo Promedio por Iteración"
          columnA="Iteración"
          columnB="Tiempo"/>
        </Col>
      </Grid>
    </div>
  );
}

export default DashboardGeneralStudy