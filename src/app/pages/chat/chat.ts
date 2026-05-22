import { Component } from '@angular/core';
import { ChatWindow } from '../../components/chat-window/chat-window';

@Component({
  selector: 'app-chat',
  imports: [ChatWindow],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {}
