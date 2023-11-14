import { BarChart, Card, Title } from "@tremor/react";

const valueFormatter = (number) => `${new Intl.NumberFormat("us").format(number).toString()}`;

const BarChartGraphic = (props) => {
  const {content, color, categories, title } = props
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