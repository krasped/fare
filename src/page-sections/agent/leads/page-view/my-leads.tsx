import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Info, Pencil, Plus, Trash2, Link as LinkIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DatePicker } from "@/components/ui/date-picker";

interface Agent {
  id: string;
  name: string;
  email: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  status: string;
  orderId: string;
  agentId?: string;
  createdAt: Date;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  destination: string;
  agentId: string;
}

const agents: Agent[] = [
  { id: "1", name: "John Agent", email: "john@agency.com" },
  { id: "2", name: "Jane Agent", email: "jane@agency.com" },
  { id: "3", name: "Bob Agent", email: "bob@agency.com" },
];

const destinations = ["Paris", "London", "Tokyo", "New York", "Dubai"];
const statuses = ["New", "In Progress", "Won", "Lost"];

const MyLeads = () => {
  const { toast } = useToast();
  const [selectedAgent, setSelectedAgent] = useState<string>("all");
  const [selectedDestination, setSelectedDestination] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newLead, setNewLead] = useState<Partial<Lead>>({
    status: "New",
    createdAt: new Date(),
  });

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "LEAD001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      destination: "Paris",
      status: "Won",
      orderId: "",
      agentId: "1",
      createdAt: new Date("2024-01-15")
    },
    {
      id: "LEAD002",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1234567891",
      destination: "London",
      status: "New",
      orderId: "",
      agentId: "2",
      createdAt: new Date("2024-02-01")
    },
    {
      id: "LEAD003",
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "+1234567892",
      destination: "Tokyo",
      status: "Won",
      orderId: "ORD123",
      agentId: "3",
      createdAt: new Date("2024-02-15")
    },
  ]);

  // Calculate metrics
  const totalLeads = leads.length;
  const openLeads = leads.filter(lead => lead.status === "New" || lead.status === "In Progress").length;
  const wonLeads = leads.filter(lead => lead.status === "Won").length;
  const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : "0";

  const createLeadFromOrder = (order: Order) => {
    console.log("Creating lead from order:", order);
    
    const existingLead = leads.find(lead => lead.email === order.customerEmail);
    
    if (existingLead) {
      console.log("Lead already exists:", existingLead);
      toast({
        title: "Lead Already Exists",
        description: "This customer already has a lead in the system.",
      });
      return existingLead.id;
    }

    const newLead: Lead = {
      id: `LEAD${Date.now()}`,
      name: order.customerName,
      email: order.customerEmail,
      phone: order.customerPhone,
      destination: order.destination,
      status: "New",
      orderId: order.id,
      agentId: order.agentId,
      createdAt: new Date(),
    };

    setLeads(prevLeads => [...prevLeads, newLead]);
    
    console.log("New lead created:", newLead);
    toast({
      title: "Lead Created",
      description: "A new lead has been automatically created from the order.",
    });

    return newLead.id;
  };

  const handleOrderCreated = (order: Order) => {
    console.log("New order created:", order);
    const leadId = createLeadFromOrder(order);
    console.log("Associated lead ID:", leadId);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesAgent = selectedAgent === "all" || lead.agentId === selectedAgent;
    const matchesDestination = selectedDestination === "all" || lead.destination === selectedDestination;
    const matchesStatus = selectedStatus === "all" || lead.status === selectedStatus;
    const matchesDate = !selectedDate || 
      new Date(lead.createdAt).toDateString() === selectedDate.toDateString();

    return matchesAgent && matchesDestination && matchesStatus && matchesDate;
  });

  const handleDelete = (id: string) => {
    setLeads(leads.filter(lead => lead.id !== id));
    toast({
      title: "Lead deleted",
      description: "The lead has been successfully deleted.",
    });
  };

  const handleEdit = (lead: Lead) => {
    console.log("Editing lead:", lead);
    const leadToEdit = { ...lead };
    setEditingLead(leadToEdit);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingLead) {
      console.log("Saving edited lead:", editingLead);
      setLeads(leads.map(lead => 
        lead.id === editingLead.id ? editingLead : lead
      ));
      setIsEditDialogOpen(false);
      setEditingLead(null);
      
      const assignedAgent = agents.find(a => a.id === editingLead.agentId);
      toast({
        title: "Lead updated",
        description: `The lead has been successfully updated${assignedAgent ? ` and reassigned to ${assignedAgent.name}` : ''}.`,
      });
    }
  };

  const handleInfo = (id: string) => {
    console.log("View lead info:", id);
  };

  const handleConnectOrder = (leadId: string) => {
    setSelectedLead(leadId);
  };

  const handleCreateLead = () => {
    console.log("Creating new lead:", newLead);
    if (newLead.name && newLead.email && newLead.phone && newLead.destination) {
      const createdLead: Lead = {
        id: `LEAD${Date.now()}`,
        name: newLead.name,
        email: newLead.email,
        phone: newLead.phone,
        destination: newLead.destination,
        status: newLead.status || "New",
        orderId: "",
        agentId: newLead.agentId,
        createdAt: new Date(),
      };

      setLeads(prevLeads => [...prevLeads, createdLead]);
      setIsCreateDialogOpen(false);
      setNewLead({ status: "New", createdAt: new Date() });
      
      const assignedAgent = agents.find(a => a.id === createdLead.agentId);
      toast({
        title: "Lead created",
        description: `New lead has been created${assignedAgent ? ` and assigned to ${assignedAgent.name}` : ''}.`,
      });
    } else {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight">My Leads</h1>
            <p className="text-muted-foreground mt-2">View and manage your leads</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="ml-auto">
            <Plus className="mr-2 h-4 w-4" /> Create Lead
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLeads}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{openLeads}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Won Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{wonLeads}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversionRate}%</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger>
                <SelectValue placeholder="Select Agent" />
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

            <Select value={selectedDestination} onValueChange={setSelectedDestination}>
              <SelectTrigger>
                <SelectValue placeholder="Select Destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Destinations</SelectItem>
                {destinations.map((destination) => (
                  <SelectItem key={destination} value={destination}>
                    {destination}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DatePicker date={selectedDate} setDate={setSelectedDate} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.id}</TableCell>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>{lead.destination}</TableCell>
                  <TableCell>
                    <Badge variant={lead.status === "Won" ? "default" : "secondary"}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.orderId || "-"}</TableCell>
                  <TableCell>
                    {agents.find(a => a.id === lead.agentId)?.name || "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(lead.id)}
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete lead</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(lead)}
                            className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit lead</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleInfo(lead.id)}
                            className="h-8 w-8 text-gray-500 hover:text-gray-600 hover:bg-gray-50"
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View lead info</TooltipContent>
                      </Tooltip>

                      {lead.status === "Won" && !lead.orderId && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleConnectOrder(lead.id)}
                              className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-50"
                            >
                              <LinkIcon className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Connect to order</TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Lead</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input 
                id="name" 
                value={newLead.name || ''} 
                onChange={(e) => setNewLead(prev => ({ ...prev, name: e.target.value }))} 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input 
                id="email" 
                type="email" 
                value={newLead.email || ''} 
                onChange={(e) => setNewLead(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Phone</label>
              <Input 
                id="phone" 
                value={newLead.phone || ''} 
                onChange={(e) => setNewLead(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="destination" className="text-sm font-medium">Destination</label>
              <Select 
                value={newLead.destination || ''} 
                onValueChange={(value) => setNewLead(prev => ({ ...prev, destination: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((destination) => (
                    <SelectItem key={destination} value={destination}>
                      {destination}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="agent" className="text-sm font-medium">Assigned Agent</label>
              <Select 
                value={newLead.agentId || ''} 
                onValueChange={(value) => setNewLead(prev => ({ ...prev, agentId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Agent" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleCreateLead} className="w-full">
              Create Lead
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input 
                id="name" 
                value={editingLead?.name || ''} 
                onChange={(e) => setEditingLead(prev => prev ? {...prev, name: e.target.value} : null)} 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input 
                id="email" 
                type="email" 
                value={editingLead?.email || ''} 
                onChange={(e) => setEditingLead(prev => prev ? {...prev, email: e.target.value} : null)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Phone</label>
              <Input 
                id="phone" 
                value={editingLead?.phone || ''} 
                onChange={(e) => setEditingLead(prev => prev ? {...prev, phone: e.target.value} : null)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="destination" className="text-sm font-medium">Destination</label>
              <Select 
                value={editingLead?.destination || ''} 
                onValueChange={(value) => setEditingLead(prev => prev ? {...prev, destination: value} : null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((destination) => (
                    <SelectItem key={destination} value={destination}>
                      {destination}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">Status</label>
              <Select 
                value={editingLead?.status || ''} 
                onValueChange={(value) => setEditingLead(prev => prev ? {...prev, status: value} : null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="agent" className="text-sm font-medium">Assigned Agent</label>
              <Select 
                value={editingLead?.agentId || ''} 
                onValueChange={(value) => setEditingLead(prev => prev ? {...prev, agentId: value} : null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Agent" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSaveEdit} className="w-full">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyLeads;
