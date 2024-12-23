import { AliExpressService } from './AliExpressService';
import { TelegramService } from './TelegramService';

export class AutoPostService {
  private static interval: NodeJS.Timeout | null = null;

  static startAutoPosting() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(async () => {
      try {
        const product = await AliExpressService.searchRandomTechProduct();
        if (product) {
          const message = AliExpressService.formatProductMessage(product);
          await TelegramService.sendMessage(message);
          console.log("Auto-posted product:", product.title);
        }
      } catch (error) {
        console.error("Error in auto-posting:", error);
      }
    }, 10 * 60 * 1000); // 10 דקות
  }

  static stopAutoPosting() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}