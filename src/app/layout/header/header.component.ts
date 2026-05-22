import { Component, EventEmitter, Input, Output, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() sidebarCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  private readonly router = inject(Router);
  private readonly currentUrl = signal(this.router.url);

  readonly pageTitle = computed(() => {
    if (this.currentUrl().startsWith('/pdf-chat')) {
      return 'PDF Chat';
    }

    if (this.currentUrl().startsWith('/settings')) {
      return 'Settings';
    }

    return 'LinkedIn Search';
  });

  readonly pageSubtitle = computed(() => {
    if (this.currentUrl().startsWith('/pdf-chat')) {
      return 'Upload a PDF and ask grounded questions';
    }

    if (this.currentUrl().startsWith('/settings')) {
      return 'Workspace preferences';
    }

    return 'People intelligence and profile discovery';
  });

  readonly pageIcon = computed(() => {
    if (this.currentUrl().startsWith('/pdf-chat')) {
      return 'forum';
    }

    if (this.currentUrl().startsWith('/settings')) {
      return 'tune';
    }

    return 'manage_search';
  });

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentUrl.set(event.urlAfterRedirects);
      });
  }
}
