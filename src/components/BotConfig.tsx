import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

export const BotConfig = () => {
  const [botToken, setBotToken] = useState("");
  const [groupId, setGroupId] = useState("");
  const { toast } = useToast();

  const handleSave = () => {
    if (!botToken || !groupId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("botToken", botToken);
    localStorage.setItem("groupId", groupId);

    toast({
      title: "Configuration Saved",
      description: "Bot settings have been updated successfully",
    });
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6 animate-slideIn">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Bot Configuration</h2>
        <p className="text-sm text-muted-foreground">
          Configure your Telegram bot settings
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="botToken">Bot Token</Label>
          <Input
            id="botToken"
            type="password"
            value={botToken}
            onChange={(e) => setBotToken(e.target.value)}
            placeholder="Enter your bot token"
            className="transition-all duration-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="groupId">Group ID</Label>
          <Input
            id="groupId"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            placeholder="Enter your group ID"
            className="transition-all duration-200"
          />
        </div>

        <Button
          onClick={handleSave}
          className="w-full transition-all duration-200 hover:scale-[1.02]"
        >
          Save Configuration
        </Button>
      </div>
    </Card>
  );
};