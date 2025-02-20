import { Card } from "@/components/ui/card";

const SearchPageView = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight">Search</h1>
        <p className="text-muted-foreground mt-2">Search for hotels and flights.</p>
      </div>
      <Card className="p-6">
        <p>Search interface will be displayed here.</p>
      </Card>
    </div>
  );
};

export default SearchPageView;