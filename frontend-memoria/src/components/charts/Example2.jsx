import React from "react";
import { Card, Metric, Text, CategoryBar, Legend, Grid } from "@tremor/react";

const categories = [
  {
    title: "Total users",
    metric: "10,345",
    subCategoryValues: [30, 70],
    subCategroyColors: ["emerald", "red"],
    subCategoryTitles: ["Active users", "Inactive users"],
  },
  {
    title: "Total Jira tickets",
    metric: "120",
    subCategoryValues: [10, 40, 50],
    subCategroyColors: ["indigo", "violet", "purple"],
    subCategoryTitles: ["Done", "In Review", "In Implementation"],
  },
  {
    title: "Total interviews",
    metric: "22",
    subCategoryValues: [30, 40, 30],
    subCategroyColors: ["emerald", "yellow", "rose"],
    subCategoryTitles: ["Offer received", "In progress", "Rejected"],
  },
];

export default function Example2() {
  return (
    <Grid numItemsSm={2} numItemsLg={3} className="gap-6" style={{ alignItems: 'flex-start' }}>
      {categories.map((item, index) => (
        <Card key={index}>
          <Text>{item.title}</Text>
          <Metric>{item.metric}</Metric>
          <CategoryBar
            values={item.subCategoryValues}
            colors={item.subCategroyColors}
            className="mt-3"
          />
          <Legend
            categories={item.subCategoryTitles}
            colors={item.subCategroyColors}
            className="mt-3"
          />
        </Card>
      ))}
    </Grid>
  );
}
