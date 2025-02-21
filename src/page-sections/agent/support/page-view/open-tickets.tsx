// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// const tickets = [
//   {
//     id: "TK-001",
//     title: "Booking System Error",
//     priority: "high",
//     status: "in progress",
//     created: "2024-02-20",
//     lastUpdate: "2024-02-21",
//   },
//   {
//     id: "TK-002",
//     title: "Payment Integration Issue",
//     priority: "medium",
//     status: "investigating",
//     created: "2024-02-19",
//     lastUpdate: "2024-02-20",
//   },
// ];

// const OpenTickets = () => {
//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="font-display text-4xl font-bold tracking-tight">Open Tickets</h1>
//         <p className="text-muted-foreground mt-2">Track your ongoing support requests</p>
//       </div>
      
//       <div className="space-y-4">
//         {tickets.map((ticket) => (
//           <Card key={ticket.id}>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-xl font-semibold">#{ticket.id}: {ticket.title}</CardTitle>
//               <Badge variant={ticket.priority === 'high' ? 'destructive' : 'secondary'}>
//                 {ticket.priority}
//               </Badge>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-2">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Status:</span>
//                   <span className="font-medium">{ticket.status}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Created:</span>
//                   <span>{ticket.created}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Last Update:</span>
//                   <span>{ticket.lastUpdate}</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OpenTickets;