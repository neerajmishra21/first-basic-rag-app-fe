import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

export interface LinkedinProfile {
  id: number;
  name: string;
  headline: string;
  company: string;
  location: string;
  experience: string;
  skills: string[];
  avatar: string;
  profileUrl: string;
}

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [MatButtonModule, MatChipsModule, MatIconModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input({ required: true }) profile!: LinkedinProfile;
}
