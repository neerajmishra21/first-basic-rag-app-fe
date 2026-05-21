import { Component } from '@angular/core';
import { ChatWindow } from '../../components/chat-window/chat-window';
import { UploadPdf } from '../../components/upload-pdf/upload-pdf';

@Component({
  selector: 'app-chat',
  imports: [UploadPdf, ChatWindow],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {}
