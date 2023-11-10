import React from "react";
import { Card, Metric, Text, Icon, Flex } from "@tremor/react";

const MetricCard = (props) => {
  const { metric, title, color } = props;
  return (
    <Card
      className="max-w-xs pt-2 pb-0 mx-auto"
      decoration="top"
      decorationColor={color}>
      <Text>{title}</Text>
      <Metric>{metric}</Metric>
    </Card>
  );
}

export default MetricCard