import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DashboardSummary, MonthlySales, CategorySales, ProductDistribution } from '../models/dashboard';
import { Transaction } from '../models/transaction';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private mockData = inject(MockDataService);
  private baseUrl = environment.apiUrl;

  getDashboard(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.baseUrl}/dashboard`).pipe(
      catchError(() => {
        console.warn('Backend API unavailable. Using fallback mock summary data.');
        return of(this.mockData.getSummary());
      })
    );
  }

  getSalesTrend(): Observable<MonthlySales[]> {
    return this.http.get<MonthlySales[]>(`${this.baseUrl}/dashboard/sales`).pipe(
      catchError(() => {
        console.warn('Backend API unavailable. Using fallback sales trend data.');
        return of(this.mockData.getSalesTrend());
      })
    );
  }

  getCategorySales(): Observable<CategorySales[]> {
    return this.http.get<CategorySales[]>(`${this.baseUrl}/dashboard/category`).pipe(
      catchError(() => {
        console.warn('Backend API unavailable. Using fallback category sales data.');
        return of(this.mockData.getCategorySales());
      })
    );
  }

  getProductDistribution(): Observable<ProductDistribution[]> {
    return this.http.get<ProductDistribution[]>(`${this.baseUrl}/dashboard/products`).pipe(
      catchError(() => {
        console.warn('Backend API unavailable. Using fallback product distribution data.');
        return of(this.mockData.getProductDistribution());
      })
    );
  }

  getSales(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/sales`).pipe(
      catchError(() => {
        console.warn('Backend API unavailable. Using fallback transactions data.');
        return of(this.mockData.getTransactions());
      })
    );
  }
}
