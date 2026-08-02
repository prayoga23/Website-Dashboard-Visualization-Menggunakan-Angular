export interface Transaction {
  id: string | number;
  customer: string;
  product: string;
  category: string;
  quantity: number;
  totalPrice: number;
  date: string;
}

export interface TransactionResponse {
  data: Transaction[];
  total: number;
  page: number;
  limit: number;
}
