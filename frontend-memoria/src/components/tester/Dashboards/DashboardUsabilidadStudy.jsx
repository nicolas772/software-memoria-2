import React, { useState, useEffect } from "react";
import DashboardStudyService from "../../../services/dashboardStudy.service";
import { Grid, Col } from "@tremor/react";
import MetricCard from "../../charts/MetricCard";
import BoxPlotChart from "../../charts/BoxPlotChart";

const DashboardUsabilidadStudy = (props) => {
   const { idStudy } = props
   const [cardsContent, setCardsContent] = useState("");
   const [tableAvgContent, setTableAvgContent] = useState("")
   const [boxPlotContent, setBoxPlotContent] = useState("")
   const [loading1, setLoading1] = useState(true)
   const [loading2, setLoading2] = useState(true)
   const [loading3, setLoading3] = useState(true)

   useEffect(() => {
      DashboardStudyService.getCardsContentUsability(idStudy).then(
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
      DashboardStudyService.getBoxPlotContentUsability(idStudy).then(
         (response) => {
            setBoxPlotContent(response.data)
            console.log(response.data)
            setLoading3(false)
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

   if (loading1 || loading3) {
      return <div>Cargando...</div>
   }

   return (
      <div>
         <Grid numItemsSm={2} numItemsLg={4} className="gap-4">
            <MetricCard
               metric={cardsContent.promedio_scoresus}
               title="Promedio Score Sus"
               color="blue"
            ></MetricCard>
            <MetricCard
               metric={cardsContent.promedio_intqual}
               title="Promedio Interfaz Quality"
               color="gray"
            ></MetricCard>
            <MetricCard
               metric={cardsContent.promedio_infoqual}
               title="Promedio Info Quality"
               color="emerald"
            ></MetricCard>
            <MetricCard
               metric={cardsContent.promedio_sysuse}
               title="Promedio System Usability"
               color="amber"
            ></MetricCard>
            <Col numColSpan={2} numColSpanLg={2}>
               <BoxPlotChart
                  title="Box Plot Puntaje Promedio por Categoría"
                  content={boxPlotContent}
               />
            </Col>
         </Grid>
      </div>
   )
}

export default DashboardUsabilidadStudy