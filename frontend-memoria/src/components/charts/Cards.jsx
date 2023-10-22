import React from "react";
import { Card, Metric, Text, Icon, Flex, Grid } from "@tremor/react";
import { UserGroupIcon, RefreshIcon, HeartIcon, CheckIcon } from "@heroicons/react/solid";

const Cards = (props) => {
  const { content } = props;
  const categories = [
    {
      title: "Iteraciones Activas",
      metric: content.iteraciones_activas,
      icon: RefreshIcon,
      color: "indigo",
    },
    {
      title: "Usuarios Participantes",
      metric: content.usuarios_participantes,
      icon: UserGroupIcon,
      color: "fuchsia",
    },
    {
      title: "% Iteraciones Completadas",
      metric: content.porc_iteraciones_completadas,
      icon: CheckIcon,
      color: "amber",
    },
    {
      title: "% Estudios Completados",
      metric: content.porc_estudios_completados,
      icon: HeartIcon,
      color: "emerald",
    },
  ];
  return (
    <Grid numItemsSm={2} numItemsLg={4} className="gap-4">
      {categories.map((item) => (
        <Card 
        key={item.title} 
        decoration="top" 
        decorationColor={item.color} 
        style={{paddingBottom:"0%", paddingTop:"3%", paddingLeft:"5%", paddingRight:"4%", height: "85px"}}
        >
          <Flex justifyContent="start" className="space-x-2">
            <Icon icon={item.icon} variant="light" size="lg" color={item.color} />
            <div className="truncate">
              <Text className="mb-1">{item.title}</Text>
              <Metric className="text-[22px] truncate">{item.metric}</Metric>
            </div>
          </Flex>
        </Card>
      ))}
    </Grid>
  );
}

export default Cards
