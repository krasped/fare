// import { Card } from "@/components/ui/card";
// import { DatePickerWithRange } from "@/components/ui/date-range-picker";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { DollarSign } from "lucide-react";

// const withdrawals = [
//   {
//     id: 1,
//     orderId: "ORD-001",
//     amount: 1500,
//     dueDate: "2024-04-30",
//     status: "Pending"
//   },
//   {
//     id: 2,
//     orderId: "ORD-002",
//     amount: 2300,
//     dueDate: "2024-04-30",
//     status: "Pending"
//   },
//   {
//     id: 3,
//     orderId: "ORD-003",
//     amount: 1800,
//     dueDate: "2024-05-31",
//     status: "Scheduled"
//   }
// ];

// const FutureWithdrawals = () => {
//   return (
//     <div className="space-y-8">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="font-display text-4xl font-bold tracking-tight">Future Withdrawals</h1>
//           <p className="text-muted-foreground mt-2">View your upcoming withdrawal schedule for completed orders.</p>
//         </div>
//         <DatePickerWithRange />
//       </div>

//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         <Card className="p-6">
//           <div className="flex items-center gap-4">
//             <div className="rounded-full bg-primary/10 p-3">
//               <DollarSign className="h-6 w-6 text-primary" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Total Pending</p>
//               <p className="text-2xl font-bold">$5,600</p>
//             </div>
//           </div>
//         </Card>
//       </div>

//       <Card>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Order ID</TableHead>
//               <TableHead>Amount</TableHead>
//               <TableHead>Due Date</TableHead>
//               <TableHead>Status</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {withdrawals.map((withdrawal) => (
//               <TableRow key={withdrawal.id}>
//                 <TableCell>{withdrawal.orderId}</TableCell>
//                 <TableCell>${withdrawal.amount}</TableCell>
//                 <TableCell>{withdrawal.dueDate}</TableCell>
//                 <TableCell>{withdrawal.status}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Card>
//     </div>
//   );
// };

// export default FutureWithdrawals;