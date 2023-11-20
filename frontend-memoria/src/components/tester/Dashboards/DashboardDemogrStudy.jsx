import React, { useState, useEffect } from "react";
import DashboardStudyService from "../../../services/dashboardStudy.service";
import MetricCardList from "../../charts/MetricCardList";
import PieChart from "../../charts/PieChart";
import BarChartGraphic from "../../charts/BarChartGraphic";
import { Grid, Col } from "@tremor/react";

const valueFormatter = (number) => `${new Intl.NumberFormat("us").format(number).toString()}`;

const DashboardDemogrStudy = (props) => {
   const { idStudy } = props
   const [cardsContent, setCardsContent] = useState("");
   const [pieChartContent, setPieChartContent] = useState("")
   const [barChartContent, setBarChartContent] = useState("")
   const [loading1, setLoading1] = useState(true)
   const [loading2, setLoading2] = useState(true)
   const [loading3, setLoading3] = useState(true)

   useEffect(() => {
      DashboardStudyService.getCardsContentDemogr(idStudy).then(
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
      DashboardStudyService.getPieChartContentDemogr(idStudy).then(
         (response) => {
            setPieChartContent(response.data)
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

   useEffect(() => {
      DashboardStudyService.getBarChartContentDemogr(idStudy).then(
         (response) => {
            setBarChartContent(response.data)
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

   if (loading1 || loading2 || loading3) {
      return <div>Cargando...</div>
   }

   return (
      <div>
         <Grid numItemsSm={1} numItemsLg={5} className="gap-6">
            <Col numColSpan={1} numColSpanLg={2}>
               <MetricCardList content={cardsContent.cantidad_usuarios} color="amber" />
               <div className="m-3"></div>
               <PieChart title="Distribución Rango Etario" color="blue" content={pieChartContent} />
            </Col>
            <Col numColSpan={2} numColSpanLg={3}>
               <BarChartGraphic
                  content={barChartContent.chartData}
                  valueFormatter={valueFormatter}
                  title="Cantidad de usuarios por Rango Etario y Género"
                  categories={barChartContent.categories}
                  color={barChartContent.colors}
                  stack={true} />
            </Col>
         </Grid>
      </div>
   )
}

export default DashboardDemogrStudy