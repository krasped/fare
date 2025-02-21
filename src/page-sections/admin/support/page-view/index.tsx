
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
