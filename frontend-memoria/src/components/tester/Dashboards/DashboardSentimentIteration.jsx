import React, { useState, useEffect } from "react";
import DashboardIterationService from '../../../services/dashboardIteration.service'
import MetricCardList from "../../charts/MetricCardList";
import PieChart from "../../charts/PieChart";
import BarChartGraphic from "../../charts/BarChartGraphic";
import { Grid, Col } from "@tremor/react";

export default function DashboardSentimentIteration(props) {
  const { idIteration } = props;
  const [cardsContent, setCardsContent] = useState("");
  const [pieChartContent, setPieChartContent] = useState("")
  const [barChartContent, setBarChartContent] = useState("")
  const [opinions, setOpinions] = useState("")
  const [cloudContent, setCloudContent] = useState("")
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)
  const [loading3, setLoading3] = useState(true)
  const [loading4, setLoading4] = useState(true)
  const [loading5, setLoading5] = useState(true)

  useEffect(() => {
    DashboardIterationService.getCardsContentSentiment(idIteration).then(
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

  if (loading1) {
    return <div>Cargando...</div>
  }


  return (
    <div>
      <Grid numItemsSm={1} numItemsLg={5} className="gap-6">
        <Col numColSpan={1} numColSpanLg={2}>
          <MetricCardList content={cardsContent.sentimiento_general} color="amber" />
          <div className="m-3"></div>
        </Col>

      </Grid>
    </div>
  );
}