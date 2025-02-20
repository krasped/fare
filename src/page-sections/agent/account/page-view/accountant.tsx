import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, Upload, Mail, DollarSign, TrendingUp, TrendingDown, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Accountant = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [timeFilter, setTimeFilter] = useState("monthly");
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  // Sample data - replace with real data
  const cashFlowData = [
    { month: 'Jan', income: 4000, expenses: 2400 },
    { month: 'Feb', income: 3000, expenses: 1398 },
    { month: 'Mar', income: 2000, expenses: 9800 },
    { month: 'Apr', income: 2780, expenses: 3908 },
    { month: 'May', income: 1890, expenses: 4800 },
    { month: 'Jun', income: 2390, expenses: 3800 },
  ];

  const expenses = [
    { id: 1, date: "2024-03-15", description: "Agent Subscription", amount: 29.99, type: "Subscription" },
    { id: 2, date: "2024-03-10", description: "Marketing Tools", amount: 49.99, type: "Tools" },
  ];

  const invoices = [
    { id: "INV001", date: "2024-03-15", client: "John Doe", amount: 299.99 },
    { id: "INV002", date: "2024-03-12", client: "Jane Smith", amount: 199.99 },
  ];

  const reports = [
    { id: "REP001", date: "2024-03-01", month: "February 2024", status: "Sent" },
    { id: "REP002", date: "2024-02-01", month: "January 2024", status: "Sent" },
  ];

  const totalIncome = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalBalance = totalIncome - totalExpenses;
  const percentageChange = ((totalBalance / totalIncome) * 100).toFixed(1);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File uploaded:", event.target.files?.[0]);
    toast({
      title: "Success",
      description: "Invoice uploaded successfully",
    });
  };

  const handleCreateReport = () => {
    console.log("Creating new report");
    toast({
      title: "Report Created",
      description: "New report has been created successfully.",
    });
  };

  const handleSendToAccountant = () => {
    console.log("Sending to accountant");
    toast({
      title: "Success",
      description: "Report sent to accountant successfully.",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-red-500">Financial Management</h1>
        <p className="text-muted-foreground mt-2">Manage your financial records and reports</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 rounded-xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-2xl font-bold">Total Balance</CardTitle>
              {percentageChange.startsWith('-') ? (
                <TrendingDown className="h-6 w-6 text-red-500" />
              ) : (
                <TrendingUp className="h-6 w-6 text-green-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">${totalBalance.toFixed(2)}</div>
              <p className="text-muted-foreground">{percentageChange}% from last month</p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Cash Flow</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="income" fill="#22c55e" name="Income" />
                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expenses</span>
                    <span className="font-bold text-red-500">${totalExpenses.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Income</span>
                    <span className="font-bold text-green-500">${totalIncome.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalIncome.toFixed(2)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{invoices.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Report</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15 Days</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Expenses</CardTitle>
              <div className="flex items-center gap-4">
                <Select defaultValue={currentMonth}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={currentMonth}>{currentMonth}</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="file"
                  className="hidden"
                  id="expense-upload"
                  onChange={handleFileUpload}
                />
                <Button asChild>
                  <label htmlFor="expense-upload" className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Invoice
                  </label>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{expense.type}</TableCell>
                      <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Income</CardTitle>
              <Select defaultValue={currentMonth}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={currentMonth}>{currentMonth}</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Reports</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    Create Report
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Report</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={currentMonth}>{currentMonth}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleCreateReport} className="w-full">
                      Generate Report
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.id}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.month}</TableCell>
                      <TableCell>{report.status}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={handleSendToAccountant}>
                          <Mail className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Accountant;