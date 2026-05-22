import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LinkedinSearchApiProfile {
  title?: string;
  linkedin_url?: string;
  snippet?: string;
}

export interface LinkedinSearchApiResponse {
  results: LinkedinSearchApiProfile[];
}

@Injectable({
  providedIn: 'root',
})
export class LinkedinSearchService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://first-basic-rag-app-be-production.up.railway.app';
  private readonly localUrl = 'http://localhost:8000';


  searchProfiles(name: string): Observable<LinkedinSearchApiResponse> {
    return this.http.get<LinkedinSearchApiResponse>(`${this.baseUrl}/linkedin-search`, {
      params: {
        name,
      },
    });
  }
}
