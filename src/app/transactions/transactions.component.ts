import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/services/api.service';
import { Transaction } from '../core/models/transaction';
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, EmptyStateComponent],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  protected Math = Math;
  private apiService = inject(ApiService);

  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  isLoading: boolean = true;

  // Filter & Search Controls
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedDate: string = '';

  // Categories list
  categories: string[] = ['Electronics', 'Fashion', 'Home & Living', 'Gadgets', 'Books'];

  // Sorting
  sortColumn: keyof Transaction = 'date';
  sortDirection: 'asc' | 'desc' = 'desc';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    this.isLoading = true;
    this.apiService.getSales().subscribe({
      next: (data) => {
        this.transactions = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading transactions:', err);
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    let result = [...this.transactions];

    // Search Filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(item =>
        item.customer.toLowerCase().includes(term) ||
        item.product.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.id.toString().toLowerCase().includes(term)
      );
    }

    // Category Filter
    if (this.selectedCategory) {
      result = result.filter(item => item.category === this.selectedCategory);
    }

    // Date Filter
    if (this.selectedDate) {
      result = result.filter(item => item.date === this.selectedDate);
    }

    // Sorting
    result.sort((a, b) => {
      let valA = a[this.sortColumn];
      let valB = b[this.sortColumn];

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredTransactions = result;
    this.currentPage = 1; // Reset to first page
  }

  onSort(column: keyof Transaction): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedDate = '';
    this.applyFilters();
  }

  // Pagination getters
  get paginatedData(): Transaction[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredTransactions.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredTransactions.length / this.pageSize) || 1;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value);
  }
}
