import { Card } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign } from "lucide-react";

const history = [
  {
    id: 1,
    orderId: "ORD-001",
    amount: 1500,
    date: "2024-03-15",
    status: "Completed"
  },
  {
    id: 2,
    orderId: "ORD-002",
    amount: 2300,
    date: "2024-03-01",
    status: "Completed"
  },
  {
    id: 3,
    orderId: "ORD-003",
    amount: 1800,
    date: "2024-02-28",
    status: "Completed"
  }
];

const WithdrawalHistory = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight">Withdrawal History</h1>
          <p className="text-muted-foreground mt-2">View your past withdrawals and their status.</p>
        </div>
        <DatePickerWithRange />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Withdrawn</p>
              <p className="text-2xl font-bold">$5,600</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.orderId}</TableCell>
                <TableCell>${item.amount}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default WithdrawalHistory;