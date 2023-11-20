import React, { useState, useEffect } from "react";
import DashboardIterationService from '../../../services/dashboardIteration.service'
import MetricCardList from "../../charts/MetricCardList";
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

   if (loading1) {
      return <div>Cargando...</div>
   }

   return (
      <div>
         <Grid numItemsSm={1} numItemsLg={3} className="gap-4">
            <MetricCardList content={cardsContent.cantidad_usuarios} color="amber" />
         </Grid>
      </div>
   )
}

export default DashboardDemogrIteration