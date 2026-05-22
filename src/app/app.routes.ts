import { Routes } from '@angular/router';
import { Chat } from './pages/chat/chat';
import { LinkedinSearchComponent } from './pages/linkedin-search/linkedin-search.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'linkedin-search',
    pathMatch: 'full'
  },
  {
    path: 'pdf-chat',
    component: Chat
  },
  {
    path: 'linkedin-search',
    component: LinkedinSearchComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: '**',
    redirectTo: 'linkedin-search'
  }
];
