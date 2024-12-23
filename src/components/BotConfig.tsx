import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { AutoPostService } from "@/services/AutoPostService";
import { TelegramService } from "@/services/TelegramService";

export const BotConfig = () => {
  const [botToken, setBotToken] = useState("");
  const [groupId, setGroupId] = useState("");
  const [affiliateLink, setAffiliateLink] = useState("");
  const [autoPostEnabled, setAutoPostEnabled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedBotToken = localStorage.getItem("botToken");
    const savedGroupId = localStorage.getItem("groupId");
    const savedAffiliateLink = localStorage.getItem("affiliateLink");

    if (savedBotToken) setBotToken(savedBotToken);
    if (savedGroupId) setGroupId(savedGroupId);
    if (savedAffiliateLink) setAffiliateLink(savedAffiliateLink);
  }, []);

  useEffect(() => {
    if (autoPostEnabled) {
      TelegramService.initialize();
      AutoPostService.startAutoPosting();
      toast({
        title: "פרסום אוטומטי הופעל",
        description: "הבוט יפרסם מוצר חדש כל 10 דקות",
      });
    } else {
      AutoPostService.stopAutoPosting();
    }

    return () => {
      AutoPostService.stopAutoPosting();
    };
  }, [autoPostEnabled, toast]);

  const handleSave = () => {
    if (!botToken || !groupId) {
      toast({
        title: "מידע חסר",
        description: "אנא מלא את כל השדות הנדרשים",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("botToken", botToken);
    localStorage.setItem("groupId", groupId);
    localStorage.setItem("affiliateLink", affiliateLink);

    toast({
      title: "הגדרות נשמרו",
      description: "הגדרות הבוט עודכנו בהצלחה",
    });
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6 animate-slideIn">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">הגדרות בוט</h2>
        <p className="text-sm text-muted-foreground">
          הגדר את פרטי הבוט שלך לטלגרם
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
            placeholder="הכנס את הטוקן של הבוט"
            className="transition-all duration-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="groupId">מזהה קבוצה</Label>
          <Input
            id="groupId"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            placeholder="הכנס את מזהה הקבוצה"
            className="transition-all duration-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="affiliateLink">קישור שותפים</Label>
          <Input
            id="affiliateLink"
            value={affiliateLink}
            onChange={(e) => setAffiliateLink(e.target.value)}
            placeholder="הכנס את קישור השותפים שלך"
            className="transition-all duration-200"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="autoPost"
            checked={autoPostEnabled}
            onCheckedChange={setAutoPostEnabled}
          />
          <Label htmlFor="autoPost">פרסום אוטומטי כל 10 דקות</Label>
        </div>

        <Button
          onClick={handleSave}
          className="w-full transition-all duration-200 hover:scale-[1.02]"
        >
          שמור הגדרות
        </Button>
      </div>
    </Card>
  );
};