export interface Product {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  productUrl: string;
}

export class AliExpressService {
  static async searchProducts(searchTerm: string): Promise<Product[]> {
    // Here we'll implement the actual AliExpress API integration
    // For now, returning mock data
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