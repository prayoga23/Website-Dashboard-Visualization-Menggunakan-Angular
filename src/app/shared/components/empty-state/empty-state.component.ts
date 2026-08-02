import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="d-flex flex-column align-items-center justify-content-center p-5 text-center animate-fade-in" style="min-height: 220px;">
      <div class="empty-icon bg-light text-muted rounded-circle p-3 mb-3">
        <i class="bi" [ngClass]="icon" style="font-size: 2.5rem;"></i>
      </div>
      <h6 class="fw-bold text-dark mb-1">{{ title }}</h6>
      <p class="text-muted fs-7 mb-0" style="max-width: 320px;">{{ description }}</p>
    </div>
  `,
  styles: [`
    .empty-icon {
      width: 70px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .fs-7 { font-size: 0.85rem; }
  `]
})
export class EmptyStateComponent {
  @Input() icon: string = 'bi-inbox';
  @Input() title: string = 'Tidak Ada Data';
  @Input() description: string = 'Data yang dicari tidak ditemukan atau belum tersedia saat ini.';
}
