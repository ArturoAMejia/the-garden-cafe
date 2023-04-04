import {
  TicketIcon,
  BanknotesIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import { Card, Metric, Text, Icon, Flex, Color, Grid } from "@tremor/react";

const categories: {
  title: string;
  metric: string;
  icon: any;
  color: Color;
}[] = [
  {
    title: "Sales",
    metric: "$ 23,456,456",
    icon: TicketIcon,
    color: "indigo",
  },
  {
    title: "Profit",
    metric: "$ 13,123",
    icon: BanknotesIcon,
    color: "fuchsia",
  },
  {
    title: "Customers",
    metric: "456",
    icon: UserGroupIcon,
    color: "amber",
  },
  {
    title: "Customers",
    metric: "456",
    icon: UserGroupIcon,
    color: "amber",
  },
];

export default function CardShow() {
  return (
    <Grid numColsSm={2} numColsLg={4} className="gap-6">
      {categories.map((item) => (
        <Card key={item.title} decoration="top" decorationColor={item.color}>
          <Flex justifyContent="start" className="space-x-4">
            <Icon
              icon={item.icon}
              variant="light"
              size="xl"
              color={item.color}
            />
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
