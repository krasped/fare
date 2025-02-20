import { Avatar, Box, Card, Stack } from "@mui/material";
import { nanoid } from "nanoid";
// CUSTOM COMPONENTS
import { MoreButton } from "@/components/more-button";
import { Paragraph, Small } from "@/components/typography";
import { FlexBetween, FlexBox } from "@/components/flexbox";
// CUSTOM UTILS METHOD
import { numberFormat } from "@/utils/numberFormat";

// CUSTOM DUMMY DATA

interface Activity {
  id: string;
  type: "lead" | "order" | "refund";
  message: string;
  timestamp: string;
}

const mockActivities = [
  {
    id: "1",
    type: "lead" as const,
    message: "New lead assigned",
    timestamp: "2 minutes ago",
  },
  {
    id: "2",
    type: "order" as const,
    message: "Order #123 completed",
    timestamp: "1 hour ago",
  },
];
// const DATA = [
//   {
//     id: nanoid(),
//     title: "Ships",
//     weight: 50368258,
//     total: "500 ships",
//     image: "/static/transportation/1.png",
//   },
//   {
//     id: nanoid(),
//     title: "Planes",
//     weight: 2336569,
//     total: "25 planes",
//     image: "/static/transportation/2.png",
//   },
//   {
//     id: nanoid(),
//     title: "Trucks",
//     weight: 36566547,
//     total: "2500 Trucks",
//     image: "/static/transportation/3.png",
//   },
//   {
//     id: nanoid(),
//     title: "Trains",
//     weight: 10236482,
//     total: "1000 trains",
//     image: "/static/transportation/4.png",
//   },
// ];

interface ActivityListProps {
  onActivityClick?: (activity: Activity) => void;
}

const ResentActivity = ({ onActivityClick }: ActivityListProps) => {
  return (
    <Card sx={{ p: 3, height: "100%" }}>
      <FlexBetween mb={4}>
        <div>
          <Paragraph ellipsis lineHeight={1.3} fontSize={18} fontWeight={500}>
              Recent Activity
          </Paragraph>

          {/* <Small fontWeight={500} color="text.secondary"> */}
            {/* Total 5,200 vehicles */}
          {/* </Small> */}
        </div>

        {/* <MoreButton size="small" /> */}
      </FlexBetween>

      <Stack spacing={3}>
        {mockActivities.map(({ id, message, timestamp }) => (
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

export default ResentActivity;
