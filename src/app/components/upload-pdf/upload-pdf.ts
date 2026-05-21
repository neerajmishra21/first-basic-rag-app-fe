import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Chat } from '../../services/chat';

@Component({
  selector: 'app-upload-pdf',
  imports: [MatButtonModule],
  templateUrl: './upload-pdf.html',
  styleUrl: './upload-pdf.scss',
})
export class UploadPdf {
  private chatService = inject(Chat)
  selectedFile!: File;

  onFileSelected(event: any) {

    this.selectedFile = event.target.files[0];
  }

   uploadPdf() {

    if (!this.selectedFile) {
      return;
    }

    this.chatService
      .uploadPdf(this.selectedFile)
      .subscribe({
        next: (response) => {
          console.log('Upload Success', response);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
}
