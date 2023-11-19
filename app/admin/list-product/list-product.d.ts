export type ListProduct = {
    product_id: string;
    image: string;
    product_name: string;
    price: number;
    promotion_price: number;
    quantity: number;
}

export interface ListProductTBState {
  product: ListProduct[];
  loading: boolean;
  search: string;
  select: string;
  index: number;
  currentPage: number;
  countProduct:number;
}
