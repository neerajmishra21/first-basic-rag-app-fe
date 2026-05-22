import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  LinkedinProfile,
  ProfileCardComponent,
} from '../../components/profile-card/profile-card.component';

@Component({
  selector: 'app-linkedin-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, ProfileCardComponent],
  templateUrl: './linkedin-search.component.html',
  styleUrl: './linkedin-search.component.scss',
})
export class LinkedinSearchComponent {
  query = '';
  hasSearched = signal(false);
  isLoading = signal(false);
  results = signal<LinkedinProfile[]>([]);

  readonly skeletonCards = Array.from({ length: 6 });

  readonly resultCountLabel = computed(() => {
    const count = this.results().length;
    return count === 1 ? '1 matching profile' : `${count} matching profiles`;
  });

  private readonly profiles: LinkedinProfile[] = [
    {
      id: 1,
      name: 'Aarav Mehta',
      headline: 'Senior Product Manager, AI Search',
      company: 'Microsoft',
      location: 'Bengaluru, India',
      experience:
        'Leads enterprise discovery products with a focus on ranking quality, user intent, and AI-powered workflows.',
      skills: ['AI Search', 'Product Strategy', 'Enterprise SaaS', 'Analytics'],
      avatar: 'https://i.pravatar.cc/160?img=12',
      profileUrl: 'https://www.linkedin.com/',
    },
    {
      id: 2,
      name: 'Maya Srinivasan',
      headline: 'Talent Partner for Data and AI Teams',
      company: 'LinkedIn',
      location: 'Hyderabad, India',
      experience:
        'Builds hiring pipelines for machine learning, platform engineering, and go-to-market leadership roles.',
      skills: ['Recruiting', 'Talent Mapping', 'LinkedIn Recruiter', 'Sourcing'],
      avatar: 'https://i.pravatar.cc/160?img=47',
      profileUrl: 'https://www.linkedin.com/',
    },
    {
      id: 3,
      name: 'Nikhil Rao',
      headline: 'Principal Software Engineer',
      company: 'Google',
      location: 'Pune, India',
      experience:
        'Designs distributed systems and developer platforms for high-volume search and recommendation products.',
      skills: ['Angular', 'Distributed Systems', 'TypeScript', 'Cloud'],
      avatar: 'https://i.pravatar.cc/160?img=15',
      profileUrl: 'https://www.linkedin.com/',
    },
    {
      id: 4,
      name: 'Priya Kapoor',
      headline: 'Growth Marketing Lead',
      company: 'Salesforce',
      location: 'Mumbai, India',
      experience:
        'Owns B2B demand programs across social selling, partner campaigns, and account-based marketing.',
      skills: ['Growth', 'ABM', 'Content Strategy', 'CRM'],
      avatar: 'https://i.pravatar.cc/160?img=32',
      profileUrl: 'https://www.linkedin.com/',
    },
    {
      id: 5,
      name: 'Daniel Joseph',
      headline: 'AI Solutions Architect',
      company: 'Accenture',
      location: 'Chennai, India',
      experience:
        'Helps enterprise teams adopt generative AI assistants, RAG systems, and secure cloud integrations.',
      skills: ['RAG', 'Azure OpenAI', 'Solution Design', 'Security'],
      avatar: 'https://i.pravatar.cc/160?img=68',
      profileUrl: 'https://www.linkedin.com/',
    },
    {
      id: 6,
      name: 'Sara Thomas',
      headline: 'UX Designer for Collaboration Tools',
      company: 'Atlassian',
      location: 'Remote',
      experience:
        'Creates dashboard experiences for knowledge workers with emphasis on clarity, accessibility, and speed.',
      skills: ['UX Design', 'Design Systems', 'Research', 'Dashboards'],
      avatar: 'https://i.pravatar.cc/160?img=5',
      profileUrl: 'https://www.linkedin.com/',
    },
  ];

  searchProfiles() {
    const normalizedQuery = this.query.trim().toLowerCase();
    this.hasSearched.set(true);
    this.isLoading.set(true);
    this.results.set([]);

    window.setTimeout(() => {
      const matches = normalizedQuery
        ? this.profiles.filter((profile) =>
            [
              profile.name,
              profile.headline,
              profile.company,
              profile.location,
              profile.experience,
              profile.skills.join(' '),
            ]
              .join(' ')
              .toLowerCase()
              .includes(normalizedQuery),
          )
        : this.profiles;

      this.results.set(matches);
      this.isLoading.set(false);
    }, 900);
  }
}
