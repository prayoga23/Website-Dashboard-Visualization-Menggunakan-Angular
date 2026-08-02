import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables, ChartConfiguration } from 'chart.js';
import { ProductDistribution } from '../../core/models/dashboard';

Chart.register(...registerables);

@Component({
  selector: 'app-product-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-wrapper">
      <canvas #productCanvas></canvas>
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
export class ProductChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() data: ProductDistribution[] = [];
  @ViewChild('productCanvas') productCanvas!: ElementRef<HTMLCanvasElement>;

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
    if (!this.productCanvas || !this.data || this.data.length === 0) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const ctx = this.productCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const colors = ['#6366f1', '#10b981', '#f59e0b', '#06b6d4', '#ec4899'];

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: this.data.map(item => item.category),
        datasets: [
          {
            data: this.data.map(item => item.percentage),
            backgroundColor: colors,
            borderWidth: 3,
            borderColor: '#ffffff',
            hoverOffset: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { family: 'Plus Jakarta Sans', size: 12 },
              padding: 16,
              usePointStyle: true
            }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            padding: 12,
            cornerRadius: 10,
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const val = context.raw as number;
                return ` ${label}: ${val}%`;
              }
            }
          }
        }
      }
    };

    this.chartInstance = new Chart(ctx, config);
  }
}
