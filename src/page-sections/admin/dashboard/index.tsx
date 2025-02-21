// // import { MetricCard } from "@/components/dashboard/MetricCard";
// // import { ActivityList } from "@/components/dashboard/ActivityList";
// // import { NotificationsPanel } from "@/components/dashboard/NotificationsPanel";

// // const mockActivities = [
// //   {
// //     id: "1",
// //     type: "lead" as const,
// //     message: "New lead assigned",
// //     timestamp: "2 minutes ago",
// //   },
// //   {
// //     id: "2",
// //     type: "order" as const,
// //     message: "Order #123 completed",
// //     timestamp: "1 hour ago",
// //   },
// // ];

// const mockAlerts = [
//   {
//     id: "1",
//     type: "error" as const,
//     message: "System maintenance scheduled",
//     timestamp: "Just now",
//   },
// ];

// const mockApprovals = [
//   {
//     id: "1",
//     type: "refund" as const,
//     message: "Refund request pending",
//     timestamp: "5 minutes ago",
//   },
// ];

// export default function Dashboard() {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Dashboard</h1>
//         <p className="text-muted-foreground">
//           Welcome back to your dashboard
//         </p>
//       </div>

//       {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <MetricCard
//           title="Total Users"
//           value="2,543"
//           description="+12.5% from last month"
//         />
//         <MetricCard
//           title="Active Users"
//           value="1,832"
//           description="+8.2% from last month"
//         />
//         <MetricCard
//           title="Revenue"
//           value="$45,234"
//           description="+15.3% from last month"
//         />
//         <MetricCard
//           title="Pending Approvals"
//           value="23"
//           description="5 require immediate action"
//         />
//       </div> */}

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//         {/* <ActivityList 
//           className="col-span-4" 
//           activities={mockActivities}
//           onActivityClick={(activity) => console.log('Activity clicked:', activity)}
//         /> */}
//         {/* <NotificationsPanel 
//           className="col-span-3"
//           alerts={mockAlerts}
//           approvals={mockApprovals}
//           onAlertClick={(alert) => console.log('Alert clicked:', alert)}
//           onApprovalClick={(approval) => console.log('Approval clicked:', approval)}
//         /> */}
//       </div>
//     </div>
//   );
// }