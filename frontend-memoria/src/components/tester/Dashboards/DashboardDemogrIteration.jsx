import React, { useState, useEffect } from "react";
import DashboardIterationService from '../../../services/dashboardIteration.service'
import MetricCardList from "../../charts/MetricCardList";
import PieChart from "../../charts/PieChart";
import { Grid, Col } from "@tremor/react";

const DashboardDemogrIteration = (props) => {
   const { idIteration } = props
   const [cardsContent, setCardsContent] = useState("");
   const [pieChartContent, setPieChartContent] = useState("")
   const [barChartContent, setBarChartContent] = useState("")
   const [loading1, setLoading1] = useState(true)
   const [loading2, setLoading2] = useState(true)
   const [loading3, setLoading3] = useState(true)

   useEffect(() => {
      DashboardIterationService.getCardsContentDemogr(idIteration).then(
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
      DashboardIterationService.getPieChartContentDemogr(idIteration).then(
        (response) => {
          setPieChartContent(response.data)
          console.log(response.data)
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
         <Grid numItemsSm={1} numItemsLg={3} className="gap-3">
            <MetricCardList content={cardsContent.cantidad_usuarios} color="amber" />
            <PieChart title="Distribución Rango Etario" color="blue" content={pieChartContent} />
         </Grid>
      </div>
   )
}

export default DashboardDemogrIteration