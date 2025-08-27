// 26. Create a class Order with list of products. Add method to calculate total price.
export class Product {
  constructor(public name: string, quantity: number, public price: number) {}
}
export class Order {
  products: Product[] = [];
  addProduct(product: Product): void {
    this.products.push(product);
  }
  totalPrice(): number {
    return this.products.reduce((sum, p) => sum + p.price, 0);
  }
}
