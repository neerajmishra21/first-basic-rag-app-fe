import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Chat {
  private http = inject(HttpClient);

  railwayUrl = "https://first-basic-rag-app-be-production.up.railway.app"

  uploadPdf(file: File) {

    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(
      this.railwayUrl+'/upload-pdf',
      formData
    );
  }

  askQuestion(question: string) {

  return this.http.post(
    this.railwayUrl+'/ask',
    {},
    {
      params: {
        question
      }
    }
  );
}
}
