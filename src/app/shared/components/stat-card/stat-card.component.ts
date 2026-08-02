import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css']
})
export class StatCardComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() growth: number = 0;
  @Input() icon: string = 'bi-bar-chart';
  @Input() formatType: 'currency' | 'number' = 'number';
  @Input() badgeColor: 'primary' | 'success' | 'warning' | 'info' = 'primary';

  get formattedValue(): string {
    if (this.formatType === 'currency') {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
      }).format(this.value);
    }
    return new Intl.NumberFormat('id-ID').format(this.value);
  }
}
