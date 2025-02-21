// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Ban, Download } from "lucide-react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { OrderChatbot } from "@/components/orders/OrderChatbot";

// interface Agent {
//   id: string;
//   name: string;
// }

// const agents: Agent[] = [
//   { id: "1", name: "John Doe" },
//   { id: "2", name: "Jane Smith" },
// ];

// const upcomingOrders = [
//   { id: "ORD001", client: "John Doe", destination: "Paris", date: "2024-03-15", amount: "$1,200", agentId: "1" },
//   { id: "ORD004", client: "Alice Brown", destination: "Rome", date: "2024-03-20", amount: "$1,500", agentId: "2" },
// ];

// const ManageOrders = () => {
//   const [selectedAgent, setSelectedAgent] = useState<string>("all");

//   const filteredOrders = upcomingOrders.filter(order => 
//     selectedAgent === "all" || order.agentId === selectedAgent
//   );

//   console.log("Selected agent:", selectedAgent);
//   console.log("Filtered orders:", filteredOrders);

//   return (
//     <div className="space-y-8 container mx-auto px-4 max-w-full">
//       <div>
//         <h1 className="font-display text-4xl font-bold tracking-tight">Manage Orders</h1>
//         <p className="text-muted-foreground mt-2">Manage upcoming orders and take actions.</p>
//       </div>

//       <Card className="p-6">
//         <div className="flex justify-between items-center mb-6">
//           <div className="w-[200px]">
//             <Select value={selectedAgent} onValueChange={setSelectedAgent}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Filter by agent" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Agents</SelectItem>
//                 {agents.map((agent) => (
//                   <SelectItem key={agent.id} value={agent.id}>
//                     {agent.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="flex space-x-4">
//             <Button variant="outline" size="sm">
//               <Ban className="mr-2 h-4 w-4" />
//               Cancel Selected
//             </Button>
//             <Button variant="outline" size="sm">
//               <Download className="mr-2 h-4 w-4" />
//               Download Vouchers
//             </Button>
//           </div>
//         </div>

//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[50px]">
//                 <Checkbox />
//               </TableHead>
//               <TableHead>Order ID</TableHead>
//               <TableHead>Client</TableHead>
//               <TableHead>Destination</TableHead>
//               <TableHead>Date</TableHead>
//               <TableHead>Agent</TableHead>
//               <TableHead>Amount</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredOrders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>
//                   <Checkbox />
//                 </TableCell>
//                 <TableCell>{order.id}</TableCell>
//                 <TableCell>{order.client}</TableCell>
//                 <TableCell>{order.destination}</TableCell>
//                 <TableCell>{order.date}</TableCell>
//                 <TableCell>
//                   {agents.find(agent => agent.id === order.agentId)?.name}
//                 </TableCell>
//                 <TableCell>{order.amount}</TableCell>
//                 <TableCell>
//                   <div className="flex space-x-2">
//                     <Button variant="ghost" size="sm">
//                       <Ban className="h-4 w-4" />
//                     </Button>
//                     <Button variant="ghost" size="sm">
//                       <Download className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Card>

//       <OrderChatbot agentName={agents[0].name} />
//     </div>
//   );
// };

// export default ManageOrders;