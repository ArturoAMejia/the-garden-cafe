import {
  TicketIcon,
  BanknotesIcon,
  UserGroupIcon,
  InboxStackIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Card, Metric, Text, Icon, Flex, Color, Grid } from "@tremor/react";
import { FC } from "react";

interface Props {
  categorias: {
    title: string;
    metric: string;
    icon: any;
    color: Color;
  }[];
}
export const CardShow: FC<Props> = ({ categorias }) => {
  return (
    <Grid numColsSm={2} numColsLg={4} className="gap-6">
      {categorias.map((item) => (
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
};
