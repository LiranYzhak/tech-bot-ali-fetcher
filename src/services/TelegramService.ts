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

    // Set up bot commands
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

      // Set up webhook for /start command
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
      
      // Check for /start commands and respond
      for (const update of updates.result) {
        if (update.message?.text === '/start') {
          await this.sendMessage(`ברוך הבא לבוט מוצרי הטכנולוגיה! 🚀\n\nאני אחפש ואפרסם מוצרי טכנולוגיה במבצע מ-AliExpress.\n\nהמוצרים יפורסמו אוטומטית בקבוצה כל 10 דקות.`);
        }
      }

    } catch (error) {
      console.error('Error handling start command:', error);
    }
  }

  static async sendMessage(message: string): Promise<void> {
    if (!this.botToken || !this.groupId) {
      throw new Error("Bot token and group ID are required");
    }

    try {
      const response = await fetch(
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

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }
}