// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Download, Eye } from "lucide-react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const documents = [
//   { id: "DOC001", orderId: "ORD001", client: "John Doe", type: "Voucher", date: "2024-03-15", agentId: "1" },
//   { id: "DOC002", orderId: "ORD001", client: "John Doe", type: "Invoice", date: "2024-03-15", agentId: "1" },
//   { id: "DOC003", orderId: "ORD002", client: "Jane Smith", type: "Voucher", date: "2024-03-10", agentId: "2" },
// ];

// const agents = [
//   { id: "1", name: "Agent 1" },
//   { id: "2", name: "Agent 2" },
// ];

// const InvoicesVouchers = () => {
//   const [selectedAgent, setSelectedAgent] = useState<string>("all");

//   console.log("Selected agent:", selectedAgent);

//   const filteredDocuments = selectedAgent === "all" 
//     ? documents 
//     : documents.filter(doc => doc.agentId === selectedAgent);

//   console.log("Filtered documents:", filteredDocuments);

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="font-display text-4xl font-bold tracking-tight">Invoices & Vouchers</h1>
//         <p className="text-muted-foreground mt-2">Access and download order documents.</p>
//       </div>

//       <div className="flex items-center gap-4 mb-6">
//         <Select
//           value={selectedAgent}
//           onValueChange={(value) => setSelectedAgent(value)}
//         >
//           <SelectTrigger className="w-[200px]">
//             <SelectValue placeholder="Select Agent" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Agents</SelectItem>
//             {agents.map((agent) => (
//               <SelectItem key={agent.id} value={agent.id}>
//                 {agent.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       <Card className="p-6">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Document ID</TableHead>
//               <TableHead>Order ID</TableHead>
//               <TableHead>Client</TableHead>
//               <TableHead>Type</TableHead>
//               <TableHead>Date</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredDocuments.map((doc) => (
//               <TableRow key={doc.id}>
//                 <TableCell>{doc.id}</TableCell>
//                 <TableCell>{doc.orderId}</TableCell>
//                 <TableCell>{doc.client}</TableCell>
//                 <TableCell>{doc.type}</TableCell>
//                 <TableCell>{doc.date}</TableCell>
//                 <TableCell>
//                   <div className="flex space-x-2">
//                     <Link to={`/orders/invoice/${doc.id}`}>
//                       <Button variant="ghost" size="sm">
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                     </Link>
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
//     </div>
//   );
// };

// export default InvoicesVouchers;