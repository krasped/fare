import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Agent {
  id: string;
  name: string;
}

const agents: Agent[] = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
];

const orderData = [
  { id: "ORD001", client: "John Doe", destination: "Paris", date: "2024-03-15", status: "upcoming", amount: "$1,200", agentId: "1" },
  { id: "ORD002", client: "Jane Smith", destination: "London", date: "2024-03-10", status: "completed", amount: "$800", agentId: "2" },
  { id: "ORD003", client: "Bob Johnson", destination: "Tokyo", date: "2024-03-05", status: "cancelled", amount: "$2,500", agentId: "1" },
];

const Orders = () => {
  const [selectedAgent, setSelectedAgent] = useState<string>("all");

  const filteredOrders = orderData.filter(order => 
    selectedAgent === "all" || order.agentId === selectedAgent
  );

  console.log("Selected agent:", selectedAgent);
  console.log("Filtered orders:", filteredOrders);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground mt-2">View and manage your client orders.</p>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Agents</SelectItem>
              {agents.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  {agent.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.client}</TableCell>
                    <TableCell>{order.destination}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      {agents.find(agent => agent.id === order.agentId)?.name}
                    </TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders
                  .filter(order => order.status === "upcoming")
                  .map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.client}</TableCell>
                      <TableCell>{order.destination}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        {agents.find(agent => agent.id === order.agentId)?.name}
                      </TableCell>
                      <TableCell>{order.amount}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders
                  .filter(order => order.status === "completed")
                  .map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.client}</TableCell>
                      <TableCell>{order.destination}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        {agents.find(agent => agent.id === order.agentId)?.name}
                      </TableCell>
                      <TableCell>{order.amount}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="cancelled" className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders
                  .filter(order => order.status === "cancelled")
                  .map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.client}</TableCell>
                      <TableCell>{order.destination}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        {agents.find(agent => agent.id === order.agentId)?.name}
                      </TableCell>
                      <TableCell>{order.amount}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Orders;