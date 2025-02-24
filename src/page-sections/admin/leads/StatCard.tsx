import { Box, Card, LinearProgress } from "@mui/material";
// CUSTOM COMPONENTS
import { Percentage } from "@/components/percentage";
import { H6, Paragraph, Span } from "@/components/typography";
import { FlexBetween, FlexBox } from "@/components/flexbox";
// CUSTOM UTILS METHOD
import { numberFormat } from "@/utils/numberFormat";
import { FC } from "react";

// ==============================================================
interface Props {
  name: string;
  value: string;
  description: string;
}
// ==============================================================

const StatCard: FC<Props> = ({ name, value, description }) => {
  return (
    <Card
      sx={{
        padding: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Paragraph color="text.secondary">{name}</Paragraph>
        <FlexBox alignItems="center" gap={1}>
          <H6>
            {value}</H6>
        </FlexBox>
        <Paragraph fontSize={12} color="text.secondary">{description}</Paragraph>

      </div>
    </Card>
  );
};

export default StatCard;
