import { useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  type: string;
  description?: string;
  agentId: number;
}

const events: Event[] = [
  {
    id: 1,
    title: "Team Meeting",
    date: "2024-04-15",
    time: "10:00 AM",
    type: "meeting",
    description: "Weekly team sync meeting",
    agentId: 1
  },
  {
    id: 2,
    title: "Client Call",
    date: "2024-04-16",
    time: "2:00 PM",
    type: "call",
    description: "Follow up with client about project timeline",
    agentId: 2
  }
];

const agents = [
  { id: 1, name: "My Events", color: "#0FA0CE" },
  { id: 2, name: "John Doe", color: "#FEC6A1" },
  { id: 3, name: "Jane Smith", color: "#E5DEFF" },
];

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedView, setSelectedView] = useState<"month" | "week" | "day" | "list">("month");
  const [selectedAgents, setSelectedAgents] = useState<number[]>([1]); // Default to showing my events
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const viewOptions = [
    { value: "month", label: "Month" },
    { value: "week", label: "Week" },
    { value: "day", label: "Day" },
    { value: "list", label: "List" },
  ];

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleAgentToggle = (agentId: number) => {
    setSelectedAgents((prev) =>
      prev.includes(agentId)
        ? prev.filter((id) => id !== agentId)
        : [...prev, agentId]
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground mt-2">Manage your schedule and appointments.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Sidebar */}
        <Card className="lg:col-span-3 p-4">
          <div className="space-y-6">
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>

            <div>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full rounded-md border shadow-sm"
                classNames={{
                  root: "w-full",
                  months: "w-full",
                  month: "w-full",
                  caption: "w-full",
                  table: "w-full",
                  head_row: "w-full",
                  row: "w-full",
                  cell: "w-8 h-8 p-0",
                  day: "w-8 h-8"
                }}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Agent Filter</h3>
              {agents.map((agent) => (
                <div key={agent.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`agent-${agent.id}`}
                    checked={selectedAgents.includes(agent.id)}
                    onCheckedChange={() => handleAgentToggle(agent.id)}
                    className="border-2"
                    style={{ borderColor: agent.color }}
                  />
                  <label
                    htmlFor={`agent-${agent.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {agent.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Main Calendar Area */}
        <Card className="lg:col-span-9 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">April 2024</h2>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex space-x-2">
              {viewOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={selectedView === option.value ? "default" : "outline"}
                  onClick={() => setSelectedView(option.value as typeof selectedView)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Calendar header */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="p-2 text-center text-sm font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
            {/* Calendar days */}
            {Array.from({ length: 35 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square border p-1 relative hover:bg-accent/50 cursor-pointer"
              >
                <span className="text-sm">{index + 1}</span>
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="text-xs p-1 mt-1 rounded cursor-pointer"
                    style={{
                      backgroundColor: agents.find(a => a.id === event.agentId)?.color,
                      display: selectedAgents.includes(event.agentId) ? "block" : "none"
                    }}
                    onClick={() => handleEventClick(event)}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>

      </div>

      {/* Event Details Sheet */}
      <Sheet open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{selectedEvent?.title}</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <p><strong>Date:</strong> {selectedEvent?.date}</p>
            <p><strong>Time:</strong> {selectedEvent?.time}</p>
            <p><strong>Description:</strong> {selectedEvent?.description}</p>
          </div>
          <div className="flex space-x-2 mt-8">
            <Button variant="default">Update</Button>
            <Button variant="outline">Cancel</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Calendar;
