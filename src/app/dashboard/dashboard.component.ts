import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../core/services/api.service';
import { DashboardSummary, MonthlySales, CategorySales, ProductDistribution } from '../core/models/dashboard';
import { Transaction } from '../core/models/transaction';
import { StatCardComponent } from '../shared/components/stat-card/stat-card.component';
import { SalesChartComponent } from '../charts/sales-chart/sales-chart.component';
import { CategoryChartComponent } from '../charts/category-chart/category-chart.component';
import { ProductChartComponent } from '../charts/product-chart/product-chart.component';
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    StatCardComponent,
    SalesChartComponent,
    CategoryChartComponent,
    ProductChartComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private apiService = inject(ApiService);

  summary: DashboardSummary | null = null;
  salesTrend: MonthlySales[] = [];
  categorySales: CategorySales[] = [];
  productDistribution: ProductDistribution[] = [];
  recentTransactions: Transaction[] = [];

  isLoadingSummary: boolean = true;
  isLoadingSales: boolean = true;
  isLoadingCategory: boolean = true;
  isLoadingProducts: boolean = true;

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // 1. Summary Cards
    this.isLoadingSummary = true;
    this.apiService.getDashboard().subscribe({
      next: (data) => {
        this.summary = data;
        this.isLoadingSummary = false;
      },
      error: () => (this.isLoadingSummary = false)
    });

    // 2. Sales Trend
    this.isLoadingSales = true;
    this.apiService.getSalesTrend().subscribe({
      next: (data) => {
        this.salesTrend = data;
        this.isLoadingSales = false;
      },
      error: () => (this.isLoadingSales = false)
    });

    // 3. Category Sales
    this.isLoadingCategory = true;
    this.apiService.getCategorySales().subscribe({
      next: (data) => {
        this.categorySales = data;
        this.isLoadingCategory = false;
      },
      error: () => (this.isLoadingCategory = false)
    });

    // 4. Product Distribution
    this.isLoadingProducts = true;
    this.apiService.getProductDistribution().subscribe({
      next: (data) => {
        this.productDistribution = data;
        this.isLoadingProducts = false;
      },
      error: () => (this.isLoadingProducts = false)
    });

    // 5. Recent Transactions
    this.apiService.getSales().subscribe({
      next: (data) => {
        this.recentTransactions = data.slice(0, 5);
      }
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value);
  }
}
