import { BarChart, Card, Title } from "@tremor/react";

const BarChartGraphic = (props) => {
  const {content, color, categories, title, valueFormatter } = props
  return (
    <Card>
      <Title>{title}</Title>
      <BarChart
        data={content}
        index="name"
        categories={categories}
        colors={color}
        valueFormatter={valueFormatter}
      />
    </Card>
  )
}

export default BarChartGraphic