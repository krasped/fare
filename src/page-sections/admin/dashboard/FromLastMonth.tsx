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
  percentage: number;
  number: number;
  description: string;
  isCurrency?: boolean;
  isPercentage?: boolean;
}
// ==============================================================

const FromLastMonth: FC<Props> = ({ name, percentage, isPercentage = true, number, description, isCurrency }) => {
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
            {isCurrency &&
              <Span fontWeight={500} fontSize={18} color="grey.400">
                $
              </Span>}
            {numberFormat(number)}</H6>
          <Percentage type={percentage > 0 ? "success" : "error"}>{percentage}{isPercentage && '%'}</Percentage>
        </FlexBox>
        <Paragraph fontSize={12} color="text.secondary">{description}</Paragraph>

      </div>

      {/* <Box mt={7}>
        <FlexBetween mb={1}>
          <Paragraph fontWeight={600}>1,500 to Goal</Paragraph>
          <Paragraph color="text.secondary">75%</Paragraph>
        </FlexBetween>

        <LinearProgress
          value={60}
          color="success"
          variant="determinate"
          sx={{ height: 8 }}
        />
      </Box> */}
    </Card>
  );
};

export default FromLastMonth;
