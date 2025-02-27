import { Box, Grid } from "@mui/material";
// CUSTOM PAGE SECTION COMPONENTS
import { H6, Paragraph } from "@/components/typography";
import { SyntheticEvent, useState } from "react";
import { TabContext, TabPanel } from "@mui/lab";
import Layout from "../Layout";
import AgentAnalytics from "../agent";
import MarketingAnalytics from "../marketing";

const AnalyticsPageView = () => {
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
            <AgentAnalytics />
          </TabPanel>

          <TabPanel value="2">
            <MarketingAnalytics />
          </TabPanel>
          
        </Layout>
      </TabContext>

    </Box>
  );
};

export default AnalyticsPageView;



// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { MetricCard } from "@/components/dashboard/MetricCard";
// import { RevenueChart } from "@/components/analytics/RevenueChart";
// import { AgentPerformanceChart } from "@/components/analytics/AgentPerformanceChart";
// import { ConversionChart } from "@/components/analytics/ConversionChart";
// import { AnalyticsTable } from "@/components/analytics/AnalyticsTable";
// import { Settings2, Download } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export default function Analytics() {
//   const { toast } = useToast();

//   const handleGenerateReport = () => {
//     toast({
//       title: "Report Generated",
//       description: "Your report has been generated and is ready for download.",
//     });
//   };

//   return (
//     <div className="container mx-auto p-6 space-y-8">
//       <div className="text-center space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
//         <p className="text-muted-foreground">
//           Monitor platform performance and generate actionable insights
//         </p>
//       </div>

//       <Tabs defaultValue="agents" className="space-y-6">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="agents">Agents Analytics</TabsTrigger>
//           <TabsTrigger value="marketing">Marketing Analytics</TabsTrigger>
//         </TabsList>

//         <TabsContent value="agents" className="space-y-6">
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//             <MetricCard
//               title="Active Agents"
//               value="47"
//               change={4}
//             />
//             <MetricCard
//               title="Average Revenue per Agent"
//               value="$2,732"
//               change={12}
//             />
//             <MetricCard
//               title="Average Conversion Rate"
//               value="24.5%"
//               change={-2.4}
//             />
//             <MetricCard
//               title="Total Agent Revenue"
//               value="$128,420"
//               change={8.2}
//             />
//           </div>

//           <div className="grid gap-6 md:grid-cols-2">
//             <Card className="p-6">
//               <h3 className="font-semibold mb-4">Agent Performance</h3>
//               <AgentPerformanceChart />
//             </Card>
            
//             <Card className="p-6">
//               <h3 className="font-semibold mb-4">Conversion Rates</h3>
//               <ConversionChart />
//             </Card>
//           </div>

//           <Card>
//             <div className="p-6">
//               <h3 className="font-semibold mb-4">Agent Performance Details</h3>
//               <AnalyticsTable />
//             </div>
//           </Card>
//         </TabsContent>

//         <TabsContent value="marketing" className="space-y-6">
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//             <MetricCard
//               title="Total Campaigns"
//               value="24"
//               change={2}
//             />
//             <MetricCard
//               title="Marketing ROI"
//               value="287%"
//               change={15.4}
//             />
//             <MetricCard
//               title="Conversion Rate"
//               value="18.2%"
//               change={3.1}
//             />
//             <MetricCard
//               title="Marketing Revenue"
//               value="$89,320"
//               change={12.5}
//             />
//           </div>

//           <div className="grid gap-6 md:grid-cols-2">
//             <Card className="p-6">
//               <h3 className="font-semibold mb-4">Campaign Revenue</h3>
//               <RevenueChart />
//             </Card>
            
//             <Card className="p-6">
//               <h3 className="font-semibold mb-4">Campaign Distribution</h3>
//               <ConversionChart />
//             </Card>
//           </div>

//           <Card>
//             <div className="p-6">
//               <h3 className="font-semibold mb-4">Campaign Performance Details</h3>
//               <AnalyticsTable />
//             </div>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       <div className="flex justify-end gap-4">
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button variant="outline">
//               <Settings2 className="mr-2 h-4 w-4" />
//               Customize Dashboard
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px]">
//             <DialogHeader>
//               <DialogTitle>Customize Dashboard</DialogTitle>
//             </DialogHeader>
//             <div className="space-y-4 py-4">
//               <p className="text-sm text-muted-foreground">
//                 Customize your dashboard view by selecting which widgets to display and their order.
//               </p>
//             </div>
//           </DialogContent>
//         </Dialog>

//         <Button onClick={handleGenerateReport}>
//           <Download className="mr-2 h-4 w-4" />
//           Export Data
//         </Button>
//       </div>
//     </div>
//   );
// }
