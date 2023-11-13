import React, { useState, useEffect } from "react";
import { Grid } from "@tremor/react";
import MetricCardCategoryBar from '../../charts/MetricCardCategoryBar';
import DashboardStudyService from '../../../services/dashboardStudy.service'

const DashboardGeneralStudy = () => {
  const [cardsContent, setCardsContent] = useState("");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    DashboardStudyService.getCardsContentGeneral().then(
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
      <Grid numItemsSm={2} numItemsLg={2} className="gap-6">
        <MetricCardCategoryBar content={cardsContent}/>
        <MetricCardCategoryBar content={cardsContent}/>
      </Grid>
    </div>
  );
}

export default DashboardGeneralStudy