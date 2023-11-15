import React, { useState, useEffect } from "react";
import { Grid, Col } from "@tremor/react";
import MetricCardList from "../../charts/MetricCardList";
import DashboardIterationService from '../../../services/dashboardIteration.service'

export default function DashboardGeneralIteration(props) {
  const { idIteration } = props;
  const [cardsContent, setCardsContent] = useState("");
  const [loading1, setLoading1] = useState(true)

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

  if (loading1){
    return <div>Cargando...</div>
  }
  return (
    <div>
      <Grid numItemsSm={2} numItemsLg={4} className="gap-4">
        <MetricCardList content={cardsContent.total_tareas} color="amber" />
      </Grid>
    </div>
  );
}