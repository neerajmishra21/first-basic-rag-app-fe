import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Chat {
  private http = inject(HttpClient);

  uploadPdf(file: File) {

    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(
      'http://localhost:8000/upload-pdf',
      formData
    );
  }

  askQuestion(question: string) {

  return this.http.post(
    'http://localhost:8000/ask',
    {},
    {
      params: {
        question
      }
    }
  );
}
}
