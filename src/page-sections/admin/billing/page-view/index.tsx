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