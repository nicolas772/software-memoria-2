import React from "react";
import { Card, Metric, Text, Icon, Flex, Grid } from "@tremor/react";
import { UserGroupIcon, RefreshIcon, HeartIcon, CheckIcon } from "@heroicons/react/solid";

const categories = [
  {
    title: "Iteraciones Activas",
    metric: "36",
    icon: RefreshIcon,
    color: "indigo",
  },
  {
    title: "Usuarios Activos",
    metric: "14",
    icon: UserGroupIcon,
    color: "fuchsia",
  },
  {
    title: "% Iteraciones Completadas",
    metric: "56%",
    icon: CheckIcon,
    color: "amber",
  },
  {
    title: "% Promedio Satisfacción",
    metric: "95%",
    icon: HeartIcon,
    color: "emerald",
  },
];

export default function Example() {
  return (
    <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
      {categories.map((item) => (
        <Card key={item.title} decoration="top" decorationColor={item.color} style={{paddingBottom:"0%", paddingTop:"3%", paddingLeft:"5%", paddingRight:"4%"}}>
          <Flex justifyContent="start" className="space-x-2">
            <Icon icon={item.icon} variant="light" size="lg" color={item.color} />
            <div className="truncate">
              <Text>{item.title}</Text>
              <Metric className="truncate">{item.metric}</Metric>
            </div>
          </Flex>
        </Card>
      ))}
    </Grid>
  );
}
