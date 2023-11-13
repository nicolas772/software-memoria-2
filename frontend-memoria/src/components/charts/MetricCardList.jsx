import {
  Card,
  Metric,
  Text,
  List,
  ListItem,
  BadgeDelta,
  Flex,
  Bold,
  Grid,
} from "@tremor/react";

export default function MetricCardList(props) {
  const {content} = props
  return (
    <Card>
      <Text>{content.title}</Text>
      <Metric>{content.metric}</Metric>
      <Flex className="mt-6">
        <Text>
          <Bold>{content.columnName1}</Bold>
        </Text>
        <Text>
          <Bold>{content.columnName2}</Bold>
        </Text>
      </Flex>
      <List className="mt-1">
        {content.data.map((item) => (
          <ListItem key={item.name}>
            <Flex justifyContent="start" className="truncate space-x-2.5">
              <Text className="truncate">{item.name}</Text>
            </Flex>
            <Text>{item.stat}</Text>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}