import { Component, inject, ElementRef, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Chat } from '../../services/chat';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  type: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat-window',
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.scss',
})
export class ChatWindow implements AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  
  private chatService = inject(Chat);
  private shouldScrollToBottom = false;

  question = '';
  messages: Message[] = [];
  isLoading = false;

  private cdr = inject(ChangeDetectorRef);

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  askQuestion() {
    if (!this.question.trim() || this.isLoading) {
      return;
    }

    // Add user message
    this.messages.push({
      type: 'user',
      text: this.question,
      timestamp: new Date()
    });

    const currentQuestion = this.question;
    this.question = '';
    this.isLoading = true;
    this.shouldScrollToBottom = true;

    this.chatService
      .askQuestion(currentQuestion)
      .subscribe({
        next: (response: any) => {
          const aiResponse = response.answer;

          this.messages = [
            ...this.messages,
            {
              type: 'ai',
              text: aiResponse,
              timestamp: new Date()
            }
          ];
          
          this.isLoading = false;
          this.shouldScrollToBottom = true;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error:', error);
          
          this.messages = [
            ...this.messages,
            {
              type: 'ai',
              text: 'Sorry, I encountered an error. Please try again.',
              timestamp: new Date()
            }
          ];

          this.isLoading = false;
          this.shouldScrollToBottom = true;
          this.cdr.detectChanges();
        }
      });
  }

  onEnterPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.askQuestion();
    }
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = 
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
}