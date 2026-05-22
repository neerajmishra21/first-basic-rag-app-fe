import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Chat {
  private http = inject(HttpClient);

  private readonly baseUrl = 'https://first-basic-rag-app-be-production.up.railway.app';
  private readonly localUrl = 'http://localhost:8000';

  uploadPdf(file: File) {

    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/upload-pdf`,
      formData
    );
  }

  askQuestion(question: string) {
    return this.http.post(`${this.baseUrl}/ask`,{},
      {
        params: {
          question
        }
      }
    );
  }
}
