import { Box, Grid } from "@mui/material";
// CUSTOM PAGE SECTION COMPONENTS
import { H6, Paragraph } from "@/components/typography";
import { SyntheticEvent, useState } from "react";
import { TabContext, TabPanel } from "@mui/lab";
import Layout from "../Layout";
import ManageTickets from "../manage";
import TicketHistory from "../history";

export enum Priority {
  high = "high",
  medium = "medium",
  critical = "critical",
  low = "low",
}

export enum Statuses {
  new = "new ticket",
  open = "Open",
  pending = "Pending",
  escalated = "Escalated",
  resolvedSuccess = "Resolved successfully",
  resolvedUnSuccess = "Resolved -  Un-successfully",
  close = "Close",
}

const SupportPageView = () => {
  const [tabValue, setTabValue] = useState("1");
  const handleTabChange = (_: SyntheticEvent, value: string) =>
    setTabValue(value);
  return (
    <Box pt={2} pb={4}>
      <H6 fontSize={18}>Support Dashboard</H6>
      <Paragraph color="text.secondary" mb={3}>
        Manage and track support tickets.
      </Paragraph>
      <TabContext value={tabValue}>

        <Layout handleTabList={handleTabChange}>
          <TabPanel value="1">
            <ManageTickets />
          </TabPanel>

          <TabPanel value="2">
            <TicketHistory />
          </TabPanel>
          
        </Layout>
      </TabContext>

    </Box>
  );
};

export default SupportPageView;
// import { useState } from "react"
// import { Ticket, History } from "lucide-react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { TicketDetailsDialog } from "@/components/tickets/TicketDetailsDialog"
// import { TicketHistoryDialog } from "@/components/tickets/TicketHistoryDialog"
// import { ManageTicketsSection } from "@/components/tickets/ManageTicketsSection"
// import { TicketHistorySection } from "@/components/tickets/TicketHistorySection"
// import { useTicketManagement } from "@/hooks/useTicketManagement"

// export default function Support() {
//   const {
//     tickets,
//     selectedTicket,
//     selectedHistoryTicket,
//     handleMetricClick,
//     handleAssignTicket,
//     handleViewTicket,
//     handleStatusChange,
//     handlePriorityChange,
//     setSelectedTicket,
//     setSelectedHistoryTicket,
//   } = useTicketManagement()
  
//   const [activeTab, setActiveTab] = useState("active")

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Support Dashboard</h1>
//         <p className="text-muted-foreground">Manage and track support tickets</p>
//       </div>

//       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//         <TabsList>
//           <TabsTrigger value="active" className="flex items-center gap-2">
//             <Ticket className="h-4 w-4" />
//             Manage Tickets
//           </TabsTrigger>
//           <TabsTrigger value="history" className="flex items-center gap-2">
//             <History className="h-4 w-4" />
//             Ticket History
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="active">
//           <ManageTicketsSection
//             tickets={tickets}
//             onMetricClick={handleMetricClick}
//             onAssignTicket={handleAssignTicket}
//             onViewTicket={handleViewTicket}
//           />
//         </TabsContent>

//         <TabsContent value="history">
//           <TicketHistorySection
//             tickets={tickets}
//             onMetricClick={handleMetricClick}
//             onViewDetails={(id) => {
//               const ticket = tickets.find(t => t.id === id)
//               if (ticket) setSelectedHistoryTicket(ticket)
//             }}
//           />
//         </TabsContent>
//       </Tabs>

//       <TicketDetailsDialog
//         ticket={selectedTicket}
//         isOpen={!!selectedTicket}
//         onClose={() => setSelectedTicket(null)}
//         onStatusChange={handleStatusChange}
//         onPriorityChange={handlePriorityChange}
//         onAssigneeChange={handleAssignTicket}
//       />

//       <TicketHistoryDialog
//         ticket={selectedHistoryTicket}
//         isOpen={!!selectedHistoryTicket}
//         onClose={() => setSelectedHistoryTicket(null)}
//       />
//     </div>
//   )
// }
