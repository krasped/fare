import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const categories = [
  "Technical Issue",
  "Billing",
  "Account Access",
  "Feature Request",
  "Other"
];

const NewTicket = () => {
  const [category, setCategory] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight">New Support Ticket</h1>
        <p className="text-muted-foreground mt-2">Create a new support ticket for assistance.</p>
      </div>

      <Card className="p-6">
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <Input placeholder="Brief description of the issue" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Detailed description of your issue..."
              className="min-h-[200px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Attachments (optional)</label>
            <Input type="file" />
          </div>

          <Button className="w-full">Submit Ticket</Button>
        </form>
      </Card>
    </div>
  );
};

export default NewTicket;