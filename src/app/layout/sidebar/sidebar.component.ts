import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  navItems: NavItem[] = [
    { label: 'RAG PDF Chat', icon: 'forum', route: '/pdf-chat' },
    { label: 'LinkedIn Search', icon: 'manage_search', route: '/linkedin-search' },
    { label: 'Settings', icon: 'tune', route: '/settings' },
  ];
}
