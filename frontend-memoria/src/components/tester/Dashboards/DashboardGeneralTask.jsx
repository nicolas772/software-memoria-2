import React, { useState, useEffect } from "react";
import MetricCard from "../../charts/MetricCard";
import { Grid, Col } from "@tremor/react";
import BarChartGraphic from "../../charts/BarChartGraphic";

const valueFormatter = (number) => {
  const percentage = new Intl.NumberFormat("us", { style: 'percent', minimumFractionDigits: 1 }).format(number);
  return percentage;
};

const valueFormatter2 = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
};

export default function DashboardGeneralTask(props) {
  const { idTask } = props;
  const [cardsContent, setCardsContent] = useState("");
  const [barChartContent1, setBarChartContent1] = useState("")
  const [barChartContent2, setBarChartContent2] = useState("")
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)
  const [loading3, setLoading3] = useState(true)

  useEffect(() => {
    const responseData = {
      porcentaje_exito: "95.7%",
      tiempo_promedio: "2m 34s",
      tiempo_optimo: "3m 0s",
      diferencia: "0m 26s"// Calcula esto según tus necesidades.
    };
    setCardsContent(responseData)
    setLoading1(false)

  }, [])

  useEffect(() => {
    const rango1 = "Niños";
    const rango2 = "Adolescentes";
    const rango3 = "Joven";
    const rango4 = "Adulto";
    const rango5 = "Adulto Mayor";
    const chartData = [
      {
        name: "Hombre",
        [rango1]: 0.6,
        [rango3]: 0.8,
        [rango4]: 0.9,
        [rango5]: 0.1,
      },
      {
        name: "Mujer",
        [rango1]: 0.6,
        [rango2]: 0.7,
        [rango3]: 0.8,
      },
      {
        name: "No Informado",
        [rango1]: 0.6,
        [rango2]: 0.7,
      },
    ];

    const colors = ["emerald", "rose", "blue", "indigo", "yellow"];
    const categories = [rango1, rango2, rango3, rango4, rango5];
    const responseData = {
      chartData: chartData,
      colors: colors,
      categories: categories,
    };
    setBarChartContent1(responseData)
    setLoading2(false)
  }, [])

  useEffect(() => {
    const rango1 = "Niños";
    const rango2 = "Adolescentes";
    const rango3 = "Joven";
    const rango4 = "Adulto";
    const rango5 = "Adulto Mayor";
    const chartData = [
      {
        name: "Hombre",
        [rango1]: 6000,
        [rango3]: 700000,
        [rango4]: 23000,
        [rango5]: 430000,
      },
      {
        name: "Mujer",
        [rango3]: 700000,
        [rango4]: 23000,
        [rango5]: 430000,
      },
      {
        name: "No Informado",
        [rango1]: 6000,
        [rango3]: 700000,
      },
    ];

    const colors = ["emerald", "rose", "blue", "indigo", "yellow"];
    const categories = [rango1, rango2, rango3, rango4, rango5];
    const responseData = {
      chartData: chartData,
      colors: colors,
      categories: categories,
    };
    setBarChartContent2(responseData)
    setLoading3(false)
  }, [])

  if (loading1 || loading2 || loading3) {
    return (
      <div>
        Cargando...
      </div>
    )
  }

  return (
    <div>
      <Grid numItemsSm={2} numItemsLg={4} className="gap-4">
        <MetricCard
          metric={cardsContent.porcentaje_exito}
          title="Porcentaje Éxito"
          color="blue"
        ></MetricCard>
        <MetricCard
          metric={cardsContent.tiempo_promedio}
          title="Tiempo Promedio"
          color="gray"
        ></MetricCard>
        <MetricCard
          metric={cardsContent.diferencia}
          title="Diferencia de Tiempo "
          color="amber"
        ></MetricCard>
        <MetricCard
          metric={cardsContent.tiempo_optimo}
          title="Tiempo Óptimo"
          color="emerald"
        ></MetricCard>
        <Col numColSpan={2} numColSpanLg={2}>
          <BarChartGraphic
            content={barChartContent1.chartData}
            valueFormatter={valueFormatter}
            title="Porcentaje Éxito por rango etario y sexo"
            categories={barChartContent1.categories}
            color={barChartContent1.colors}
            stack={false} />
        </Col>
        <Col numColSpan={2} numColSpanLg={2}>
          <BarChartGraphic
            content={barChartContent2.chartData}
            valueFormatter={valueFormatter2}
            title="Tiempo Promedio por rango etario y sexo"
            categories={barChartContent2.categories}
            color={barChartContent2.colors}
            stack={false} />
        </Col>
      </Grid>
    </div>
  );
}