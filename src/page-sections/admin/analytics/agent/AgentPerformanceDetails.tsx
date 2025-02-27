import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableHead,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { nanoid } from "nanoid";
// CUSTOM COMPONENTS
import { Scrollbar } from "@/components/scrollbar";
import { MoreButton } from "@/components/more-button";
import { StatusBadge } from "@/components/status-badge";
import { Paragraph, Small } from "@/components/typography";
import { FlexBetween, FlexBox } from "@/components/flexbox";
// COMMON DASHBOARD RELATED COMPONENTS
import { BodyTableCell, HeadTableCell } from "../_common";

// CUSTOM DUMMY DATA SET
// const DATA = [
//   {
//     id: nanoid(),
//     total: 678.5,
//     status: "Pending",
//     status_type: "warning",
//     createdAt: Date.now() - 7 * 60 * 1000,
//     payment: { type: "PayPal", image: "/static/payment/paypal.svg" },
//   },
//   {
//     id: nanoid(),
//     total: 165.58,
//     status: "Shipped",
//     status_type: "success",
//     createdAt: Date.now() - 8 * 60 * 1000,
//     payment: { type: "Card", image: "/static/payment/master-card.svg" },
//   },
//   {
//     id: nanoid(),
//     total: 463.25,
//     status: "Confirmed",
//     status_type: "primary",
//     createdAt: Date.now() - 9 * 60 * 1000,
//     payment: { type: "Skrill", image: "/static/payment/skrill.svg" },
//   },
//   {
//     id: nanoid(),
//     total: 363.25,
//     status: "Rejected",
//     status_type: "error",
//     createdAt: Date.now() - 10 * 60 * 1000,
//     payment: { type: "Visa Card", image: "/static/payment/visa-2.svg" },
//   },
// ];

const DATA = [
  {
    metric: "Revenue",
    timeRange: "Last 7 days",
    value: "$24,500",
  },
  {
    metric: "Conversion Rate",
    timeRange: "Last 30 days",
    value: "24.5%",
  },
  {
    metric: "Orders",
    timeRange: "Last 7 days",
    value: "342",
  },
]

const AgentPerformanceDetails = () => {
  return (
    <Card sx={{ height: "100%" }}>
      <FlexBetween p={3}>
        <Paragraph fontSize={18} fontWeight={500}>
          Agent Performance Details
        </Paragraph>

        {/* <MoreButton size="small" /> */}
      </FlexBetween>

      <Scrollbar>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <HeadTableCell>MEETRIC</HeadTableCell>
              <HeadTableCell>TIME RANGE</HeadTableCell>
              <HeadTableCell>VALUE</HeadTableCell>
              {/* <HeadTableCell align="center">STATUS</HeadTableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
            {DATA.map((item, index) => (
              <TableRow key={index}>
                <BodyTableCell>
                  <Paragraph color="text.primary" fontWeight={500}>
                    {item.metric}
                  </Paragraph>
                  </BodyTableCell>
                <BodyTableCell>{item.timeRange}</BodyTableCell>
                <BodyTableCell>${item.value}</BodyTableCell>

                {/* <BodyTableCell align="center">
                  <StatusBadge type={item.status_type}>
                    {item.status}
                  </StatusBadge>
                </BodyTableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  );
};

export default AgentPerformanceDetails;
