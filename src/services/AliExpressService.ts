export interface Product {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  productUrl: string;
}

export class AliExpressService {
  private static techKeywords = [
    "smartphone",
    "laptop",
    "headphones",
    "smartwatch",
    "tablet",
    "earbuds",
    "power bank",
    "charger",
    "camera",
    "speaker"
  ];

  static async searchProducts(searchTerm: string): Promise<Product[]> {
    // כאן תהיה האינטגרציה עם ה-API של AliExpress
    // כרגע מחזיר נתונים לדוגמה
    return [
      {
        id: "1",
        title: "Sample Tech Product",
        price: "$99.99",
        imageUrl: "https://placeholder.com/300",
        productUrl: "https://aliexpress.com/item/1",
      },
    ];
  }

  static async searchRandomTechProduct(): Promise<Product | null> {
    const randomKeyword = this.techKeywords[Math.floor(Math.random() * this.techKeywords.length)];
    try {
      const products = await this.searchProducts(randomKeyword);
      return products.length > 0 ? products[0] : null;
    } catch (error) {
      console.error("Error searching for tech product:", error);
      return null;
    }
  }

  static formatProductMessage(product: Product): string {
    const affiliateLink = localStorage.getItem("affiliateLink");
    const productUrlWithAffiliate = affiliateLink 
      ? `${product.productUrl}?${affiliateLink}`
      : product.productUrl;

    return `
🔥 <b>${product.title}</b>

💰 מחיר: ${product.price}
🛒 <a href="${productUrlWithAffiliate}">לרכישה</a>

#TechDeals #AliExpress
    `.trim();
  }
}