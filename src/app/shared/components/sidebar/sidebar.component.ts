import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isCollapsed: boolean = false;
  @Input() isMobileOpen: boolean = false;
  @Output() closeMobile = new EventEmitter<void>();

  menuItems = [
    { title: 'Dashboard', icon: 'bi-grid-1x2-fill', route: '/dashboard' },
    { title: 'Analytics', icon: 'bi-bar-chart-line-fill', route: '/analytics' },
    { title: 'Transactions', icon: 'bi-receipt-cutoff', route: '/transactions' },
    { title: 'Products', icon: 'bi-box-seam-fill', route: '/products' },
    { title: 'Customers', icon: 'bi-people-fill', route: '/customers' }
  ];
}

