export interface DashboardSummary {
  revenue: number;
  transaction: number;
  customer: number;
  product: number;
  revenueGrowth?: number;
  transactionGrowth?: number;
  customerGrowth?: number;
  productGrowth?: number;
}

export interface MonthlySales {
  month: string;
  sales: number;
}

export interface CategorySales {
  category: string;
  totalSales: number;
}

export interface ProductDistribution {
  category: string;
  count: number;
  percentage: number;
}
