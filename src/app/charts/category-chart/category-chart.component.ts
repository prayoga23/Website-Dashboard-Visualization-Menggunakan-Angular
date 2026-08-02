import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables, ChartConfiguration } from 'chart.js';
import { CategorySales } from '../../core/models/dashboard';

Chart.register(...registerables);

@Component({
  selector: 'app-category-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-wrapper">
      <canvas #categoryCanvas></canvas>
    </div>
  `,
  styles: [`
    .chart-wrapper {
      position: relative;
      width: 100%;
      height: 320px;
    }
  `]
})
export class CategoryChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() data: CategorySales[] = [];
  @ViewChild('categoryCanvas') categoryCanvas!: ElementRef<HTMLCanvasElement>;

  private chartInstance?: Chart;

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.renderChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  private renderChart(): void {
    if (!this.categoryCanvas || !this.data || this.data.length === 0) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const ctx = this.categoryCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const colors = ['#6366f1', '#10b981', '#f59e0b', '#06b6d4', '#ec4899'];

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: this.data.map(item => item.category),
        datasets: [
          {
            label: 'Total Penjualan (IDR)',
            data: this.data.map(item => item.totalSales),
            backgroundColor: colors,
            borderRadius: 8,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            padding: 12,
            cornerRadius: 10,
            callbacks: {
              label: (context) => {
                const val = context.raw as number;
                return ` Penjualan: Rp ${val.toLocaleString('id-ID')}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Plus Jakarta Sans', size: 12 }, color: '#64748b' }
          },
          y: {
            grid: { color: '#f1f5f9' },
            ticks: {
              font: { family: 'Plus Jakarta Sans', size: 11 },
              color: '#64748b',
              callback: (value) => `Rp ${(Number(value) / 1000000).toFixed(1)}M`
            }
          }
        }
      }
    };

    this.chartInstance = new Chart(ctx, config);
  }
}
