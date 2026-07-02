export interface Product {
  id: number;
  name: string;
  price: number;
  desc: string;
  storeId: number;
  categoryId: number;
  isEdible: boolean;
  status: string | null;
  sku: string;
  discount_price: number | null;
}