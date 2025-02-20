import { useState } from "react";
import { SearchSection } from "@/components/network/SearchSection";
import { TagFilter } from "@/components/network/TagFilter";
import { MyConnections } from "@/components/network/MyConnections";
import { ConnectionRequests } from "@/components/network/ConnectionRequests";
import { AgentCard } from "@/components/network/AgentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const mockAgents = [
  {
    id: "1",
    name: "Sarah Johnson",
    image: "/placeholder.svg",
    summary: "Luxury travel specialist with 10+ years of experience in European destinations.",
    tags: ["Luxury", "Europe", "Hotels"],
    isActive: true,
    isConnected: false,
  },
  {
    id: "2",
    name: "Michael Chen",
    image: "/placeholder.svg",
    summary: "Adventure travel expert specializing in Asia-Pacific tours and expeditions.",
    tags: ["Adventure", "Asia", "Tours"],
    isActive: false,
    isConnected: true,
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    image: "/placeholder.svg",
    summary: "Caribbean cruise specialist with expertise in family vacation packages.",
    tags: ["Cruises", "Caribbean", "Family"],
    isActive: true,
    isConnected: false,
  },
  {
    id: "4",
    name: "David Kim",
    image: "/placeholder.svg",
    summary: "Cultural tourism expert focusing on historical sites and local experiences.",
    tags: ["Culture", "History", "Local"],
    isActive: true,
    isConnected: false,
  },
  {
    id: "5",
    name: "Lisa Thompson",
    image: "/placeholder.svg",
    summary: "Safari and wildlife tour specialist in African destinations.",
    tags: ["Safari", "Africa", "Wildlife"],
    isActive: false,
    isConnected: true,
  },
  {
    id: "6",
    name: "Ahmed Hassan",
    image: "/placeholder.svg",
    summary: "Middle East travel expert specializing in luxury desert experiences.",
    tags: ["Luxury", "Middle East", "Adventure"],
    isActive: true,
    isConnected: false,
  },
  {
    id: "7",
    name: "Maria Silva",
    image: "/placeholder.svg",
    summary: "South American destinations specialist with focus on eco-tourism.",
    tags: ["Eco-Tourism", "South America", "Nature"],
    isActive: false,
    isConnected: false,
  },
  {
    id: "8",
    name: "John Parker",
    image: "/placeholder.svg",
    summary: "Ski resort specialist with expertise in European and North American destinations.",
    tags: ["Ski", "Winter", "Luxury"],
    isActive: true,
    isConnected: true,
  },
  {
    id: "9",
    name: "Sophie Martin",
    image: "/placeholder.svg",
    summary: "Food and wine tour expert specializing in Mediterranean destinations.",
    tags: ["Food", "Wine", "Mediterranean"],
    isActive: true,
    isConnected: false,
  },
  {
    id: "10",
    name: "James Wilson",
    image: "/placeholder.svg",
    summary: "Business travel specialist with global corporate connections.",
    tags: ["Business", "Corporate", "Global"],
    isActive: false,
    isConnected: false,
  },
  {
    id: "11",
    name: "Anna Kowalski",
    image: "/placeholder.svg",
    summary: "Eastern European cultural tours expert with language expertise.",
    tags: ["Culture", "Eastern Europe", "History"],
    isActive: true,
    isConnected: false,
  },
  {
    id: "12",
    name: "Carlos Mendoza",
    image: "/placeholder.svg",
    summary: "Latin American adventure and eco-tourism specialist.",
    tags: ["Adventure", "Latin America", "Eco-Tourism"],
    isActive: true,
    isConnected: true,
  }
];

const DESTINATIONS = [
  "Europe",
  "Asia",
  "North America",
  "South America",
  "Africa",
  "Middle East",
  "Caribbean",
  "Pacific",
];

const TRAVEL_GROUPS = [
  "Family",
  "Couples",
  "Solo",
  "Business",
  "Groups",
  "Seniors",
];

const ConnectionNetworkPageView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  const filteredAgents = mockAgents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => agent.tags.includes(tag));
    const matchesDestination = !selectedDestination || agent.tags.includes(selectedDestination);
    const matchesGroup = !selectedGroup || agent.tags.includes(selectedGroup);
    return matchesSearch && matchesTags && matchesDestination && matchesGroup;
  });

  const allTags = Array.from(new Set(mockAgents.flatMap((agent) => agent.tags)));
  const hasNewRequests = true; // This would normally be determined by your backend

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight">Connection Network</h1>
        <p className="text-muted-foreground mt-2">Connect with other travel agents</p>
      </div>

      <Tabs defaultValue="all-agents" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-[400px] grid-cols-3">
            <TabsTrigger value="all-agents">All Agents</TabsTrigger>
            <TabsTrigger value="my-connections">My Connections</TabsTrigger>
            <TabsTrigger value="requests" className="relative">
              Requests
              {hasNewRequests && (
                <Badge 
                  variant="default" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-purple-500 text-white"
                >
                  1
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all-agents">
          <div className="space-y-4">
            <SearchSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isAdvancedOpen={isAdvancedOpen}
              setIsAdvancedOpen={setIsAdvancedOpen}
              selectedDestination={selectedDestination}
              setSelectedDestination={setSelectedDestination}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
              destinations={DESTINATIONS}
              travelGroups={TRAVEL_GROUPS}
            />

            <TagFilter
              allTags={allTags}
              selectedTags={selectedTags}
              onTagClick={handleTagClick}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="my-connections">
          <MyConnections agents={mockAgents} />
        </TabsContent>

        <TabsContent value="requests">
          <ConnectionRequests agents={mockAgents} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConnectionNetworkPageView;