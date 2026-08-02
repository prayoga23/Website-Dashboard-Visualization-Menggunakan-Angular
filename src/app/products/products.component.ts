import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/services/api.service';
import { ProductDistribution } from '../core/models/dashboard';
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  template: `
    <div class="content-header mb-4 animate-fade-in">
      <h4 class="fw-bold mb-1">Katalog & Stok Produk</h4>
      <p class="text-muted fs-7 mb-0">Daftar kategori produk dan jumlah persediaan barang.</p>
    </div>

    <div class="custom-card animate-fade-in">
      <app-loading-spinner *ngIf="isLoading" message="Memuat katalog produk..."></app-loading-spinner>
      
      <div class="row g-3" *ngIf="!isLoading">
        <div class="col-12 col-md-6 col-lg-4" *ngFor="let item of products">
          <div class="p-3 border rounded-3 bg-light">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="badge badge-soft-primary">{{ item.category }}</span>
              <small class="fw-bold text-success">{{ item.percentage }}% dari Total</small>
            </div>
            <h5 class="fw-bold text-dark mb-1">{{ item.count }} Items</h5>
            <small class="text-muted fs-8">Kategori stok barang aktif dalam inventaris.</small>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .fs-7 { font-size: 0.85rem; }
    .fs-8 { font-size: 0.75rem; }
  `]
})
export class ProductsComponent implements OnInit {
  private apiService = inject(ApiService);
  products: ProductDistribution[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.apiService.getProductDistribution().subscribe(res => {
      this.products = res;
      this.isLoading = false;
    });
  }
}
