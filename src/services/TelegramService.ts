export class TelegramService {
  private static botToken: string | null = null;
  private static groupId: string | null = null;

  static initialize() {
    this.botToken = localStorage.getItem("botToken");
    this.groupId = localStorage.getItem("groupId");
  }

  static async sendMessage(message: string) {
    if (!this.botToken || !this.groupId) {
      throw new Error("Bot not configured");
    }

    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: this.groupId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    return response.json();
  }
}