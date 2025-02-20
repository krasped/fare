import { Avatar, Box, Card, Stack } from "@mui/material";
import { nanoid } from "nanoid";
// CUSTOM COMPONENTS
import { MoreButton } from "@/components/more-button";
import { Paragraph, Small } from "@/components/typography";
import { FlexBetween, FlexBox } from "@/components/flexbox";
// CUSTOM UTILS METHOD
import { numberFormat } from "@/utils/numberFormat";

// CUSTOM DUMMY DATA

interface Approval {
  id: string;
  type: "refund" | "escalation";
  message: string;
  timestamp: string;
}

const mockApprovals = [
  {
    id: "1",
    type: "refund" as const,
    message: "Refund request pending",
    timestamp: "5 minutes ago",
  },
];


interface ActivityListProps {
  onActivityClick?: (approval: Approval) => void;
}

const PendingApprovals = ({ onActivityClick }: ActivityListProps) => {
  return (
    <Card sx={{ p: 3, height: "100%" }}>
      <FlexBetween mb={4}>
        <div>
          <Paragraph ellipsis lineHeight={1.3} fontSize={18} fontWeight={500}>
            Pending Approvals
          </Paragraph>

          {/* <Small fontWeight={500} color="text.secondary"> */}
            {/* Total 5,200 vehicles */}
          {/* </Small> */}
        </div>

        {/* <MoreButton size="small" /> */}
      </FlexBetween>

      <Stack spacing={3}>
        {mockApprovals.map(({ id, message, timestamp }) => (
          <FlexBetween key={id}>
            <FlexBox
              gap={1.5}
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {/* <Avatar variant="rounded" alt={title} src={image} /> */}

              <Box
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                <Paragraph
                  ellipsis
                  fontSize={16}
                  lineHeight={1}
                  fontWeight={600}
                >
                  {message}
                </Paragraph>

                <Small ellipsis fontWeight={500} color="text.secondary">
                  {timestamp}
                </Small>
              </Box>
            </FlexBox>

            {/* <Box textAlign="end">
              <Paragraph fontWeight={500}>{numberFormat(weight)}</Paragraph>
              <Small fontWeight={500} color="text.secondary">
                Tons
              </Small>
            </Box> */}
          </FlexBetween>
        ))}
      </Stack>
    </Card>
  );
};

export default PendingApprovals;
