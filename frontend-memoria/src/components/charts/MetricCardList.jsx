import { Card, Metric, Text, List, ListItem, Flex, Bold, Grid } from "@tremor/react";
import { CheckCircleIcon, PlusCircleIcon, CheckIcon, RefreshIcon } from '@heroicons/react/solid';

export default function MetricCardList(props) {
  const { content } = props;

  // Mapa de iconos según los valores del campo "icon"
  const iconMap = {
    activa: CheckCircleIcon,
    creada: PlusCircleIcon,
    finalizado: CheckIcon,
    proceso: RefreshIcon
  };
  const iconColorMap = {
    activa: "green",       // Verde para indicar algo activo
    creada: "grey",        // Gris para indicar algo creado pero no activo
    finalizado: "#3399FF",    // Azul para indicar algo finalizado
    proceso: "orange",     // Naranja para indicar algo en proceso (puedes usar un color asociado a la acción de carga o movimiento)
  };

  return (
    <Card className="pb-0">
      <Text>{content.title}</Text>
      <Metric>{content.metric}</Metric>
      <Flex className="mt-2">
        <Text>
          <Bold>{content.columnName1}</Bold>
        </Text>
        <Text>
          <Bold>{content.columnName2}</Bold>
        </Text>
      </Flex>
      <List className="mt-1">
        {content.data.map((item) => {
          // Obtén el componente de icono correspondiente
          const IconComponent = iconMap[item.icon] || CheckCircleIcon;
          const IconColor = iconColorMap[item.icon] || "black"
          return (
            <ListItem key={item.name}>
              <IconComponent className="metric-card-icon" color={IconColor}/>
              <Flex justifyContent="start" className="truncate space-x-2.5">
                <Text className="truncate">{item.name}</Text>
              </Flex>
              <Text>{item.stat}</Text>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
}
