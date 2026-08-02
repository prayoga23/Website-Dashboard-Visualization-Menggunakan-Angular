import { Injectable } from '@angular/core';
import { DashboardSummary, MonthlySales, CategorySales, ProductDistribution } from '../models/dashboard';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  getSummary(): DashboardSummary {
    return {
      revenue: 15000000,
      transaction: 300,
      customer: 120,
      product: 50,
      revenueGrowth: 12.5,
      transactionGrowth: 8.4,
      customerGrowth: 15.2,
      productGrowth: 4.1
    };
  }

  getSalesTrend(): MonthlySales[] {
    return [
      { month: 'Jan', sales: 1200000 },
      { month: 'Feb', sales: 1500000 },
      { month: 'Mar', sales: 1100000 },
      { month: 'Apr', sales: 1800000 },
      { month: 'May', sales: 2100000 },
      { month: 'Jun', sales: 1900000 },
      { month: 'Jul', sales: 2400000 },
      { month: 'Aug', sales: 2200000 },
      { month: 'Sep', sales: 2700000 },
      { month: 'Oct', sales: 2500000 },
      { month: 'Nov', sales: 3100000 },
      { month: 'Dec', sales: 3500000 }
    ];
  }

  getCategorySales(): CategorySales[] {
    return [
      { category: 'Electronics', totalSales: 5500000 },
      { category: 'Fashion', totalSales: 3800000 },
      { category: 'Home & Living', totalSales: 2900000 },
      { category: 'Gadgets', totalSales: 1800000 },
      { category: 'Books', totalSales: 1000000 }
    ];
  }

  getProductDistribution(): ProductDistribution[] {
    return [
      { category: 'Electronics', count: 18, percentage: 36 },
      { category: 'Fashion', count: 14, percentage: 28 },
      { category: 'Home & Living', count: 9, percentage: 18 },
      { category: 'Gadgets', count: 6, percentage: 12 },
      { category: 'Books', count: 3, percentage: 6 }
    ];
  }

  getTransactions(): Transaction[] {
    return [
      { id: 'TRX-1001', customer: 'Ahmad Rizky', product: 'MacBook Pro M3', category: 'Electronics', quantity: 1, totalPrice: 24000000, date: '2026-08-01' },
      { id: 'TRX-1002', customer: 'Siti Nurhaliza', product: 'Nike Air Jordan', category: 'Fashion', quantity: 2, totalPrice: 3600000, date: '2026-07-31' },
      { id: 'TRX-1003', customer: 'Budi Santoso', product: 'Sony WH-1000XM5', category: 'Gadgets', quantity: 1, totalPrice: 4500000, date: '2026-07-30' },
      { id: 'TRX-1004', customer: 'Dewi Lestari', product: 'Ergonomic Desk Chair', category: 'Home & Living', quantity: 1, totalPrice: 2800000, date: '2026-07-29' },
      { id: 'TRX-1005', customer: 'Eko Prasetyo', product: 'Mechanical Keyboard RGB', category: 'Gadgets', quantity: 3, totalPrice: 3300000, date: '2026-07-28' },
      { id: 'TRX-1006', customer: 'Rina Wijaya', product: 'Smart TV 4K 55"', category: 'Electronics', quantity: 1, totalPrice: 7800000, date: '2026-07-27' },
      { id: 'TRX-1007', customer: 'Fajar Nugraha', product: 'Leather Jacket Premium', category: 'Fashion', quantity: 1, totalPrice: 1500000, date: '2026-07-26' },
      { id: 'TRX-1008', customer: 'Maya Putri', product: 'Coffee Maker Espresso', category: 'Home & Living', quantity: 2, totalPrice: 2400000, date: '2026-07-25' },
      { id: 'TRX-1009', customer: 'Hendra Gunawan', product: 'Clean Code Book', category: 'Books', quantity: 2, totalPrice: 450000, date: '2026-07-24' },
      { id: 'TRX-1010', customer: 'Nadia Safira', product: 'Wireless Charging Pad', category: 'Gadgets', quantity: 4, totalPrice: 1200000, date: '2026-07-23' }
    ];
  }
}
