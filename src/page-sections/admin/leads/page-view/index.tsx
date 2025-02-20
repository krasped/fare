import { Download, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CampaignTable } from "@/components/campaigns/CampaignTable";
import { CampaignFilters } from "@/components/campaigns/CampaignFilters";
import { useToast } from "@/hooks/use-toast";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Sample data
const campaigns = [
  {
    id: "CAM001",
    name: "Summer Sale 2024",
    createdBy: "john.doe@example.com",
    platform: "Facebook",
    status: "pending",
    createdAt: "2024-03-15",
    totalAds: 5,
    headline: "Biggest Summer Sale Ever!",
    description: "Get up to 70% off on all summer essentials",
    targetDestination: "USA, UK, Canada",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    displayPlatforms: ["Facebook", "Instagram"],
    assets: [
      { id: 1, type: "image", url: "summer-sale-1.jpg" },
      { id: 2, type: "video", url: "promo-video.mp4" },
    ],
  },
  {
    id: "CAM002",
    name: "Product Launch",
    createdBy: "jane.smith@example.com",
    platform: "Instagram",
    status: "active",
    createdAt: "2024-03-14",
    totalAds: 3,
    headline: "Exciting New Product Launch!",
    description: "Join us for the launch of our latest product.",
    targetDestination: "USA",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    displayPlatforms: ["Instagram", "Facebook"],
    assets: [
      { id: 1, type: "image", url: "product-launch-1.jpg" },
    ],
  },
  {
    id: "CAM003",
    name: "Holiday Special",
    createdBy: "mark.wilson@example.com",
    platform: "Google",
    status: "inactive",
    createdAt: "2024-03-13",
    totalAds: 4,
    headline: "Holiday Special Discounts!",
    description: "Get ready for the holidays with our special discounts.",
    targetDestination: "Global",
    startDate: "2024-11-01",
    endDate: "2024-12-31",
    displayPlatforms: ["Google", "YouTube"],
    assets: [
      { id: 1, type: "image", url: "holiday-special-1.jpg" },
    ],
  },
];

const users = [
  { id: 1, email: "john.doe@example.com" },
  { id: 2, email: "jane.smith@example.com" },
  { id: 3, email: "mark.wilson@example.com" },
  { id: 4, email: "sarah.parker@example.com" },
];

export default function Leads() {
  const { toast } = useToast();
  const [mainFilter, setMainFilter] = useState("");
  const [subFilter, setSubFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteCampaign = (campaignId: string) => {
    toast({
      title: "Campaign Deleted",
      description: "The campaign has been successfully deleted.",
    });
  };

  const handleUpdateCampaign = (updatedCampaign: typeof campaigns[0]) => {
    toast({
      title: "Campaign Updated",
      description: `The campaign "${updatedCampaign.name}" has been updated.`,
    });
  };

  const handleApplyFilter = () => {
    // Reset sub-filter when main filter changes
    if (!mainFilter) {
      setSubFilter("");
    }
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    if (!mainFilter || !subFilter) return true;

    switch (mainFilter) {
      case "status":
        return campaign.status.toLowerCase() === subFilter.toLowerCase();
      case "platform":
        return campaign.platform.toLowerCase() === subFilter.toLowerCase();
      case "createdBy":
        return campaign.createdBy === subFilter;
      default:
        return true;
    }
  }).filter((campaign) => {
    if (!searchQuery) return true;
    return (
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Marketing Campaigns</h1>
          <p className="text-muted-foreground">Manage and approve marketing campaigns</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-[#7C3AED] hover:bg-[#6D28D9]">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Campaign
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit px-4 py-2">
              <p className="text-sm text-muted-foreground">same as marketing</p>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Campaigns"
          value="24"
          description="All active and inactive campaigns"
        />
        <MetricCard
          title="Live"
          value="4/10"
          description="Currently running campaigns"
        />
        <MetricCard
          title="Waiting Approval"
          value="3"
          description="Campaigns pending review"
        />
        <MetricCard
          title="Total Ads"
          value="156"
          description="Across all campaigns"
        />
      </div>

      <CampaignFilters
        mainFilter={mainFilter}
        subFilter={subFilter}
        searchQuery={searchQuery}
        onMainFilterChange={setMainFilter}
        onSubFilterChange={setSubFilter}
        onSearchQueryChange={setSearchQuery}
        onApplyFilter={handleApplyFilter}
        users={users}
      />

      <CampaignTable
        campaigns={filteredCampaigns}
        onDeleteCampaign={handleDeleteCampaign}
        onUpdateCampaign={handleUpdateCampaign}
      />
    </div>
  );
}
