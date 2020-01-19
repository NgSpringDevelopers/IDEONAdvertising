export class Cart {
  productCode: string;
  quantity: number;
  constructor(productCode: string, quantity: number) {
    this.productCode = productCode;
    this.quantity = quantity;
  }
}
