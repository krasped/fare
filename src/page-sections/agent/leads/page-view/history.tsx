import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const orderHistory = [
  { id: "PUR001", date: "2024-03-15", destination: "Paris", quantity: 5, amount: "$250.00", status: "Completed" },
  { id: "PUR002", date: "2024-03-10", destination: "London", quantity: 3, amount: "$150.00", status: "Completed" },
  { id: "PUR003", date: "2024-03-05", destination: "Tokyo", quantity: 10, amount: "$500.00", status: "Completed" },
];

const OrderHistory = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight">Order History</h1>
        <p className="text-muted-foreground mt-2">View your lead purchase history.</p>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderHistory.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.destination}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default OrderHistory;