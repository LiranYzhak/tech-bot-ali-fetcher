interface TelegramConfig {
  botToken: string;
  groupId: string;
}

export class TelegramService {
  private static botToken: string | null = null;
  private static groupId: string | null = null;

  static initialize() {
    const botToken = localStorage.getItem("botToken");
    const groupId = localStorage.getItem("groupId");

    if (!botToken || !groupId) {
      throw new Error("Bot token and group ID are required");
    }

    this.botToken = botToken;
    this.groupId = groupId;

    this.setupBotCommands();
  }

  private static async setupBotCommands() {
    if (!this.botToken) return;

    try {
      const response = await fetch(`https://api.telegram.org/bot${this.botToken}/setMyCommands`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commands: [
            {
              command: 'start',
              description: 'התחל להשתמש בבוט'
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to set bot commands');
      }

      this.handleStartCommand();

    } catch (error) {
      console.error('Error setting up bot commands:', error);
    }
  }

  private static async handleStartCommand() {
    if (!this.botToken) return;

    try {
      const response = await fetch(`https://api.telegram.org/bot${this.botToken}/getUpdates`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Failed to get updates');
      }

      const updates = await response.json();
      
      for (const update of updates.result) {
        if (update.message?.text === '/start') {
          await this.sendMessage(`ברוך הבא לבוט מוצרי הטכנולוגיה! 🚀\n\nאני אחפש ואפרסם מוצרי טכנולוגיה במבצע מ-AliExpress.\n\nהמוצרים יפורסמו אוטומטית בקבוצה כל 10 דקות.`);
        }
      }

    } catch (error) {
      console.error('Error handling start command:', error);
    }
  }

  static async sendMessage(message: string, imageUrl?: string): Promise<void> {
    if (!this.botToken || !this.groupId) {
      throw new Error("Bot token and group ID are required");
    }

    try {
      // אם יש תמונה, שלח אותה עם הכיתוב
      if (imageUrl) {
        await fetch(
          `https://api.telegram.org/bot${this.botToken}/sendPhoto`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: this.groupId,
              photo: imageUrl,
              caption: message,
              parse_mode: "HTML",
            }),
          }
        );
      } else {
        // אם אין תמונה, שלח רק טקסט
        await fetch(
          `https://api.telegram.org/bot${this.botToken}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: this.groupId,
              text: message,
              parse_mode: "HTML",
            }),
          }
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }
}