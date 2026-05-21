import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Chat } from '../../services/chat';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-window',
  imports: [MatButtonModule, CommonModule, FormsModule],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.scss',
})
export class ChatWindow {
  private chatService = inject(Chat);

  question = '';

  messages: any[] = [];

  askQuestion() {

    if (!this.question.trim()) {
      return;
    }

    this.messages.push({
      type: 'user',
      text: this.question
    });

    this.chatService
      .askQuestion(this.question)
      .subscribe({
        next: (response: any) => {
          console.log('response', response)
          const aiResponse =
            response.answer;

          this.messages.push({
            type: 'ai',
            text: aiResponse
          });

          console.log('thismsg',this.messages)
          this.question = '';
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

}
