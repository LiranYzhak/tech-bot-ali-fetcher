import { BotConfig } from "@/components/BotConfig";
import { ProductSearch } from "@/components/ProductSearch";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 animate-fadeIn">
          <h1 className="text-4xl font-bold tracking-tight">AliExpress Tech Bot</h1>
          <p className="text-lg text-muted-foreground">
            Automate tech product discovery and sharing on Telegram
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <BotConfig />
          <ProductSearch />
        </div>
      </div>
    </div>
  );
};

export default Index;