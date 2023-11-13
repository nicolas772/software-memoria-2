import React, { useState, useEffect } from "react";
import { Grid } from "@tremor/react";
import MetricCardCategoryBar from '../../charts/MetricCardCategoryBar';
import MetricCardList from "../../charts/MetricCardList";
import DashboardStudyService from '../../../services/dashboardStudy.service'

const DashboardGeneralStudy = (props) => {
  const {idStudy} = props
  const [cardsContent, setCardsContent] = useState("");
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

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <div>
      <Grid numItemsSm={2} numItemsLg={4} className="gap-4">
        <MetricCardList content={cardsContent.total_iteraciones} color="amber"/>
        <MetricCardList content={cardsContent.total_usuarios} color="emerald"/>
      </Grid>
    </div>
  );
}

export default DashboardGeneralStudy