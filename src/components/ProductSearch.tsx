import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

export const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchTerm) {
      toast({
        title: "Search Term Required",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    try {
      // Here we'll implement the AliExpress API search
      // For now, we'll just show a success message
      toast({
        title: "Search Initiated",
        description: "Products will be posted to the Telegram group",
      });
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Failed to search for products",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6 animate-slideIn">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Product Search</h2>
        <p className="text-sm text-muted-foreground">
          Search for tech products on AliExpress
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="searchTerm">Search Term</Label>
          <Input
            id="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter product search term"
            className="transition-all duration-200"
          />
        </div>

        <Button
          onClick={handleSearch}
          disabled={isSearching}
          className="w-full transition-all duration-200 hover:scale-[1.02]"
        >
          {isSearching ? "Searching..." : "Search Products"}
        </Button>
      </div>
    </Card>
  );
};