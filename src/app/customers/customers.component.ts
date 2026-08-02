import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/services/api.service';
import { Transaction } from '../core/models/transaction';
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  template: `
    <div class="content-header mb-4 animate-fade-in">
      <h4 class="fw-bold mb-1">Daftar Pelanggan / Customer</h4>
      <p class="text-muted fs-7 mb-0">Manajemen profil pelanggan dan riwayat aktivitas belanja.</p>
    </div>

    <div class="custom-card animate-fade-in">
      <app-loading-spinner *ngIf="isLoading" message="Memuat data pelanggan..."></app-loading-spinner>
      
      <div class="table-responsive" *ngIf="!isLoading">
        <table class="table custom-table align-middle mb-0">
          <thead>
            <tr>
              <th>Pelanggan</th>
              <th>Produk Terakhir</th>
              <th>Total Belanja</th>
              <th class="text-end">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of customers">
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="avatar bg-soft-primary text-primary fw-bold rounded-circle p-2 d-flex align-items-center justify-content-center" style="width:36px; height:36px;">
                    {{ item.customer.charAt(0) }}
                  </div>
                  <div>
                    <div class="fw-bold text-dark fs-7">{{ item.customer }}</div>
                    <small class="text-muted fs-8">Customer ID: {{ item.id }}</small>
                  </div>
                </div>
              </td>
              <td class="fs-7">{{ item.product }}</td>
              <td class="fw-bold text-primary fs-7">Rp {{ item.totalPrice.toLocaleString('id-ID') }}</td>
              <td class="text-end">
                <span class="badge badge-soft-success">Active Member</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .fs-7 { font-size: 0.85rem; }
    .fs-8 { font-size: 0.75rem; }
  `]
})
export class CustomersComponent implements OnInit {
  private apiService = inject(ApiService);
  customers: Transaction[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.apiService.getSales().subscribe(res => {
      this.customers = res;
      this.isLoading = false;
    });
  }
}
