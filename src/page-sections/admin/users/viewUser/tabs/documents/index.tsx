import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableHead,
  IconButton,
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
import { BodyTableCell, HeadTableCell } from "./_common";
import { Check, Close } from "@mui/icons-material";
import { Eye, Watch } from "lucide-react";

// CUSTOM DUMMY DATA SET
const DATA = [
    { name: "Business License", uploadDate: "2024-02-15", status: "pending" },
    { name: "Insurance Certificate", uploadDate: "2024-02-14", status: "pending" },
    { name: "Tax Documents", uploadDate: "2024-02-13", status: "pending" },
  ]

// [
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

const Documents = () => {
  return (
    <Box sx={{ paddingTop: "20px", height: "100%" }}>
      {/* <FlexBetween p={3}>
        <Paragraph fontSize={18} fontWeight={500}>
          Recent Orders
        </Paragraph>

      </FlexBetween> */}

      <Scrollbar>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <HeadTableCell>DOCUMENT</HeadTableCell>
              <HeadTableCell>UPLOAD DATE</HeadTableCell>
              <HeadTableCell align="center">STATUS</HeadTableCell>
              <HeadTableCell>ACTIONS</HeadTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {DATA.map((item, index) => (
              <TableRow key={index}>
                {/* <BodyTableCell>
                  <FlexBox gap={2}>
                    <FlexBox alignItems="center" minWidth={35}>
                      <img src={item.payment.image} alt={item.payment.type} />
                    </FlexBox>

                    <div>
                      <Paragraph color="text.primary" fontWeight={500}>
                        #{item.id.substring(0, 5)}
                      </Paragraph>
                      <Small>Paid by {item.payment.type}</Small>
                    </div>
                  </FlexBox>
                </BodyTableCell>

                <BodyTableCell>
                  {formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                  })}
                </BodyTableCell> */}

                <BodyTableCell>{item.name}</BodyTableCell>
                <BodyTableCell>{item.uploadDate}</BodyTableCell>

                <BodyTableCell align="center">
                  <StatusBadge type={item.status}>
                    {item.status}
                  </StatusBadge>
                </BodyTableCell>

                <BodyTableCell >
                  <FlexBox>
                    <IconButton color="primary" onClick={() => {}}>
                      <Eye width={18} />
                    </IconButton>
                    <IconButton color="success" onClick={() => {}}>
                      <Check sx={{ fontSize: 18 }} />
                    </IconButton>
                    <IconButton color="error" onClick={() => {}}>
                      <Close sx={{ fontSize: 18 }} />
                    </IconButton>
                  </FlexBox>
                  
                </BodyTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </Box>
  );
};

export default Documents;
