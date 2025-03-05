import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableHead,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { nanoid } from "nanoid";
// CUSTOM COMPONENTS
import { Scrollbar } from "@/components/scrollbar";
import { MoreButton } from "@/components/more-button";
import { StatusBadge } from "@/components/status-badge";
import { H6, Paragraph, Small } from "@/components/typography";
import { FlexBetween, FlexBox } from "@/components/flexbox";
// COMMON DASHBOARD RELATED COMPONENTS
import { BodyTableCell, HeadTableCell } from "./_common";
import { Check, Close } from "@mui/icons-material";
import { Eye, Watch } from "lucide-react";
import { ConfirmationDialog } from "@/components/dialogs";
import { useState } from "react";
import { useSnackbar } from "@/contexts/snackbarContext";

// CUSTOM DUMMY DATA SET
const DATA = [
  {
    date: "2024-02-15",
    amount: "$99.99",
    status: "paid",
    type: "Monthly Subscription",
  },
  {
    date: "2024-01-15",
    amount: "$99.99",
    status: "paid",
    type: "Monthly Subscription",
  },
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

const Subscriptions = () => {
  const showSnackbar = useSnackbar();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleConfirm = (isConfirm: boolean) =>{
    setIsOpen(false)
    if(isConfirm) {showSnackbar("Subscription Cancelled", "Your subscription has been cancelled and will not renew automatically.", "error");}
  }
  
    return (
      <Box sx={{ height: "100%" }}>
          <Stack p={3} spacing={3}>
          <SinglePost
            category="Current Plan"
            subTitle="You are currently on the Professional Plan, which renews automatically every month unless canceled."
            title="Professional"
          />

          <SinglePost
            category="2024-12-31"
            title="Expiry Date"
          />

          <Paragraph color="grey.500">Next billing date: December 31, 2024</Paragraph>
      </Stack>

      <FlexBox pr={3} pl={3} gap={2}>
        <Button color="primary"
          onClick={() => {showSnackbar("Subscription Renewed","The subscription has been renewed successfully." )}}
        >
            Renew Subscription
        </Button>
        <Button color="error"
          onClick={() => {setIsOpen(true)}}
        >
            Cancel Subscription
        </Button>
        <ConfirmationDialog title={"Cancel Subscription Confirmation"} 
            description={"Are you sure you want to cancel the subscription? Once canceled, this subscription will not renew after its expiration date."} 
            confirmTitle={"Yes, Cancel"} 
            cancelTitle={"No, Go Back"} 
            isOpen={isOpen}
            handleConfirm={handleConfirm} />
      </FlexBox>

      <FlexBetween p={3} >
        <Paragraph fontSize={18} fontWeight={500}>
          Payment History
        </Paragraph>

      </FlexBetween>

      <Scrollbar>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <HeadTableCell>DATE</HeadTableCell>
              <HeadTableCell>TYPE</HeadTableCell>
              <HeadTableCell align="center">AMOUNT</HeadTableCell>
              <HeadTableCell>STATUS</HeadTableCell>
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

                <BodyTableCell>{item.date}</BodyTableCell>
                <BodyTableCell>{item.type}</BodyTableCell>
                <BodyTableCell>${item.amount}</BodyTableCell>

                <BodyTableCell align="center">
                  <StatusBadge type={item.status}>
                    {item.status}
                  </StatusBadge>
                </BodyTableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </Box>
  );
};

export default Subscriptions;

// =======================================================================================
type PostProps = {
  subTitle?: string;
  title: string;
  category: string;
};
// =======================================================================================

function SinglePost({ subTitle, title, category }: PostProps) {
  return (
    <FlexBetween>
      <Stack spacing={0.5}>
        <H6 fontSize={14}>{title}</H6>
        <Paragraph color="grey.500">{category}</Paragraph>

        {subTitle && <FlexBox gap={0.5} alignItems="center" color="text.secondary">
          <Small lineHeight={1}>{subTitle}</Small>
        </FlexBox>}
      </Stack>
    </FlexBetween>
  );
}
