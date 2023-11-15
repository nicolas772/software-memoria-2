import React, { useState, useEffect } from "react";
import { Grid, Col } from "@tremor/react";
import MetricCardList from "../../charts/MetricCardList";
import TableDashGeneralIteration from "../../tables/TableDashGeneralIteration";
import DashboardIterationService from '../../../services/dashboardIteration.service'

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
    const responseData = [
      {
        name: "Tarea 1",
        avgTime: 40000,
        optTiempo: 40000,
        diference: 10000,
      },
      {
        name: "Tarea 2",
        avgTime: 30000,
        optTiempo: 40000,
        diference: 10000,
      },
      {
        name: "Tarea 3",
        avgTime: 30000,
        optTiempo: 40000,
        diference: 10000,
      },
    ]
    setTableTimeContent(responseData)
    setLoading2(false)
  }, [])

  if (loading1) {
    return <div>Cargando...</div>
  }
  return (
    <div>
      <Grid numItemsSm={2} numItemsLg={4} className="gap-4">
        <MetricCardList content={cardsContent.total_tareas} color="amber" />
        <MetricCardList content={cardsContent.total_usuarios} color="emerald" />
        <Col numColSpan={2} numColSpanLg={2}>
          <TableDashGeneralIteration content = {tableTimeContent} />
        </Col>
      </Grid>
    </div>
  );
}