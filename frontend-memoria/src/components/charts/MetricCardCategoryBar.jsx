import { Card, Metric, Text, CategoryBar, Legend, Grid } from "@tremor/react";
import "./css/fixedMargin.css"

const content = {
  title: "Total users",
  metric: "10,345",
  subCategoryValues: [30, 70],
  subCategroyColors: ["emerald", "red"],
  subCategoryTitles: ["Active users", "Inactive users"],
}
export default function MetricCardCategoryBar() {
  return (
    <Card>
      <Text>{content.title}</Text>
      <Metric>{content.metric}</Metric>
      <CategoryBar
        values={content.subCategoryValues}
        colors={content.subCategroyColors}
        className="mt-2 mb-3"
      />
      <Legend
        categories={content.subCategoryTitles}
        colors={content.subCategroyColors}
        className="mt-2 legend-text"
      />
    </Card>
  );
}