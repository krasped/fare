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
          {/* 
          <TabPanel value="4">
            <Documents />
          </TabPanel>

          <TabPanel value="5">
            <Connections />
          </TabPanel>

          <TabPanel value="6">
            <Activity />
          </TabPanel> */}
        </Layout>
      </TabContext>

    </Box>
  );
};

export default BillingPageView;



// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { WalletManagement } from "@/components/billing/WalletManagement";
// import { InvoiceTracking } from "@/components/billing/InvoiceTracking";
// import { RefundApprovals } from "@/components/billing/RefundApprovals";

// const Billing = () => {
//   return (
//     <div className="space-y-6">
//       <div className="text-center space-y-2">
//         <h1 className="text-3xl font-bold">Billing</h1>
//         <p className="text-muted-foreground">
//           Manage financial transactions, wallet balances, and refunds.
//         </p>
//       </div>

//       <Tabs defaultValue="wallet" className="space-y-4">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="wallet">Wallet Management</TabsTrigger>
//           <TabsTrigger value="invoices">Invoice Tracking</TabsTrigger>
//           <TabsTrigger value="refunds">Refund Approvals</TabsTrigger>
//         </TabsList>
//         <TabsContent value="wallet">
//           <WalletManagement />
//         </TabsContent>
//         <TabsContent value="invoices">
//           <InvoiceTracking />
//         </TabsContent>
//         <TabsContent value="refunds">
//           <RefundApprovals />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default Billing;