import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  LinkedinProfile,
  ProfileCardComponent,
} from '../../components/profile-card/profile-card.component';
import {
  LinkedinSearchApiProfile,
  LinkedinSearchService,
} from '../../services/linkedin-search';

@Component({
  selector: 'app-linkedin-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, ProfileCardComponent],
  templateUrl: './linkedin-search.component.html',
  styleUrl: './linkedin-search.component.scss',
})
export class LinkedinSearchComponent {
  private readonly linkedinSearchService = inject(LinkedinSearchService);

  query = '';
  hasSearched = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');
  results = signal<LinkedinProfile[]>([]);

  readonly skeletonCards = Array.from({ length: 6 });

  readonly resultCountLabel = computed(() => {
    const count = this.results().length;
    return count === 1 ? '1 matching profile' : `${count} matching profiles`;
  });

  searchProfiles() {
    const query = this.query.trim();

    if (!query || this.isLoading()) {
      return;
    }

    this.hasSearched.set(true);
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.results.set([]);

    this.linkedinSearchService.searchProfiles(query).subscribe({
      next: (response) => {
        this.results.set(
          (response.results ?? []).map((profile, index) => this.mapApiProfile(profile, index)),
        );
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('LinkedIn search failed:', error);
        this.errorMessage.set('Unable to fetch LinkedIn profiles. Please try again.');
        this.isLoading.set(false);
      },
    });
  }

  private mapApiProfile(profile: LinkedinSearchApiProfile, index: number): LinkedinProfile {
    const titleParts = this.cleanTitle(profile.title).split(' - ').filter(Boolean);
    const name = titleParts[0] || this.query.trim();
    const headline = titleParts.slice(1).join(' - ') || 'LinkedIn profile';
    const snippet = profile.snippet || 'Open the LinkedIn profile to view more details.';

    return {
      id: index + 1,
      name,
      headline,
      company: this.extractCompany(titleParts),
      location: 'LinkedIn',
      experience: snippet,
      skills: this.extractSkills(snippet),
      avatar: this.createAvatarUrl(name),
      profileUrl: profile.linkedin_url || 'https://www.linkedin.com/',
    };
  }

  private cleanTitle(title?: string): string {
    return (title || '')
      .replace(/\| LinkedIn/gi, '')
      .replace(/LinkedIn/gi, '')
      .trim();
  }

  private extractCompany(titleParts: string[]): string {
    return titleParts.length > 2 ? titleParts[titleParts.length - 1] : 'LinkedIn profile';
  }

  private extractSkills(snippet: string): string[] {
    const keywords = ['Leadership', 'AI', 'Engineering', 'Product', 'Data', 'Cloud', 'Strategy'];
    const matches = keywords.filter((keyword) =>
      snippet.toLowerCase().includes(keyword.toLowerCase()),
    );

    return matches.length ? matches.slice(0, 4) : ['LinkedIn', 'Profile', 'Search'];
  }

  private createAvatarUrl(name: string): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0A66C2&color=fff&bold=true`;
  }
}
