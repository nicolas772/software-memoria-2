import React from "react";
import { Card, Metric, Text, Icon, Flex, Grid } from "@tremor/react";
import { CashIcon, TicketIcon, UserGroupIcon } from "@heroicons/react/solid";

const categories = [
  {
    title: "Estudios Activos",
    metric: "36",
    icon: TicketIcon,
    color: "indigo",
  },
  {
    title: "Iteraciones Completadas",
    metric: "14",
    icon: CashIcon,
    color: "fuchsia",
  },
  {
    title: "% Iteraciones Completadas",
    metric: "456",
    icon: UserGroupIcon,
    color: "amber",
  },
  {
    title: "% Usuarios Activos",
    metric: "12%",
    icon: UserGroupIcon,
    color: "emerald",
  },
];

export default function Example() {
  return (
    <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
      {categories.map((item) => (
        <Card key={item.title} decoration="top" decorationColor={item.color} style={{paddingBottom:"0px", paddingTop:"4%", paddingLeft:"2%", paddingRight:"2%"}}>
          <Flex justifyContent="start" className="space-x-2">
            <Icon icon={item.icon} variant="light" size="xl" color={item.color} />
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
