import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Event } from '../../models/event.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ClientDashboardComponent implements OnInit {
  events: Event[] = [];
  username!:string | null;
  searchTerm!:string;
  feedbackOptions: string[] = ['Very Bad', 'Bad', 'Satisfactory', 'Good', 'Best'];  
  ratingOptions: number[] = [1, 2, 3, 4, 5];

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.getEvents();
  }

  getEvents() {
    this.clientService.getEvents().subscribe(
      response => {
        this.events = response;
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }
  
  searchEvents(event:any)
  {
    this.searchTerm = event.target.value.trim().toLowerCase();
    if(!this.searchTerm)
    {
      this.getEvents();
    }
    else
    {
      this.events = this.events.filter((data)=>{
        return data.title.toLowerCase().includes(this.searchTerm);
      })
    }
  }

  submitFeedback(feedbackInput: HTMLInputElement, ratingSelect: HTMLSelectElement, eventId: any) {
    const feedback = feedbackInput.value;
    const rating = ratingSelect.value;
    if (feedback && rating) {
      this.clientService.provideFeedback(eventId,feedback).subscribe(
        response => {
          this.getEvents();
        },
      
      );
    }
    alert('Feedback submitted successfully');
    this.clearFeedbackForm(feedbackInput, ratingSelect);
  }

  clearFeedbackForm(feedbackInput: HTMLInputElement, ratingSelect: HTMLSelectElement) {
    feedbackInput.value = '';
    ratingSelect.value = '';
  }

  logout() {
    localStorage.setItem('token', '');
    localStorage.setItem('userId', '');
    this.router.navigate(['/login']);
  }
}
