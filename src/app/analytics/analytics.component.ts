import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/services/api.service';
import { SalesChartComponent } from '../charts/sales-chart/sales-chart.component';
import { CategoryChartComponent } from '../charts/category-chart/category-chart.component';
import { ProductChartComponent } from '../charts/product-chart/product-chart.component';
import { MonthlySales, CategorySales, ProductDistribution } from '../core/models/dashboard';
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    SalesChartComponent,
    CategoryChartComponent,
    ProductChartComponent,
    LoadingSpinnerComponent
  ],
  template: `
    <div class="content-header mb-4 animate-fade-in">
      <h4 class="fw-bold mb-1">Advanced Sales Analytics</h4>
      <p class="text-muted fs-7 mb-0">Analisis mendalam mengenai tren bisnis, performa kategori, dan alokasi produk.</p>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-12">
        <div class="custom-card">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h6 class="fw-bold mb-0">Monthly Revenue Growth (Jan - Dec)</h6>
              <small class="text-muted fs-8">Perkembangan total omzet bulanan dari REST API</small>
            </div>
            <span class="badge badge-soft-primary">Line Chart</span>
          </div>
          <app-loading-spinner *ngIf="isLoading" message="Memuat analitik tren..."></app-loading-spinner>
          <app-sales-chart *ngIf="!isLoading" [data]="salesTrend"></app-sales-chart>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-12 col-lg-6">
        <div class="custom-card h-100">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h6 class="fw-bold mb-0">Sales Distribution by Category</h6>
            <span class="badge badge-soft-success">Bar Chart</span>
          </div>
          <app-loading-spinner *ngIf="isLoading" message="Memuat data kategori..."></app-loading-spinner>
          <app-category-chart *ngIf="!isLoading" [data]="categorySales"></app-category-chart>
        </div>
      </div>

      <div class="col-12 col-lg-6">
        <div class="custom-card h-100">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h6 class="fw-bold mb-0">Product Share Percentage</h6>
            <span class="badge badge-soft-warning">Doughnut Chart</span>
          </div>
          <app-loading-spinner *ngIf="isLoading" message="Memuat porsi produk..."></app-loading-spinner>
          <app-product-chart *ngIf="!isLoading" [data]="productDistribution"></app-product-chart>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .fs-7 { font-size: 0.85rem; }
    .fs-8 { font-size: 0.75rem; }
  `]
})
export class AnalyticsComponent implements OnInit {
  private apiService = inject(ApiService);

  salesTrend: MonthlySales[] = [];
  categorySales: CategorySales[] = [];
  productDistribution: ProductDistribution[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.isLoading = true;
    this.apiService.getSalesTrend().subscribe(res => this.salesTrend = res);
    this.apiService.getCategorySales().subscribe(res => this.categorySales = res);
    this.apiService.getProductDistribution().subscribe(res => {
      this.productDistribution = res;
      this.isLoading = false;
    });
  }
}
