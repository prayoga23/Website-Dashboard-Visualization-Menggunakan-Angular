import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="d-flex flex-column align-items-center justify-content-center p-5 animate-fade-in" style="min-height: 200px;">
      <div class="spinner-border text-primary" role="status" style="width: 2.5rem; height: 2.5rem;">
        <span class="visually-hidden">Memuat data...</span>
      </div>
      <p class="text-muted fw-semibold mt-3 mb-0 fs-7">{{ message }}</p>
    </div>
  `,
  styles: [`
    .fs-7 { font-size: 0.88rem; }
  `]
})
export class LoadingSpinnerComponent {
  @Input() message: string = 'Memuat data dari server...';
}
