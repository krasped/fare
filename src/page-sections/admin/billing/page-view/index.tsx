import { Box, Grid } from "@mui/material";
// CUSTOM PAGE SECTION COMPONENTS
import { H6, Paragraph } from "@/components/typography";
import { SyntheticEvent, useState } from "react";
import { TabContext, TabPanel } from "@mui/lab";
import Layout from "../Layout";
import WalletManagement from "../WalletManagement";
import InvoiceTracking from "../InvoiceTracking";
import RefundApprovals from "../RefundApprovals";

const BillingPageView = () => {
  const [tabValue, setTabValue] = useState("1");
  const handleTabChange = (_: SyntheticEvent, value: string) =>
    setTabValue(value);
  return (
    <Box pt={2} pb={4}>
      <H6 fontSize={18}>Billing</H6>
      <Paragraph color="text.secondary" mb={3}>
        Manage financial transactions, wallet balances, and refunds.
      </Paragraph>
      <TabContext value={tabValue}>

        <Layout handleTabList={handleTabChange}>
          <TabPanel value="1">
            <WalletManagement />
          </TabPanel>

          <TabPanel value="2">
            <InvoiceTracking />
          </TabPanel>

          <TabPanel value="3">
            <RefundApprovals />
          </TabPanel>
          
        </Layout>
      </TabContext>

    </Box>
  );
};

export default BillingPageView;