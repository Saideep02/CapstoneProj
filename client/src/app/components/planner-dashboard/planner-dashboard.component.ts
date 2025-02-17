import { Component, OnInit } from '@angular/core';
import { PlannerService } from '../../services/planner.service';
import { Event } from '../../models/event.model';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { HttpClientModule } from '@angular/common/http';

import { StaffService } from '../../services/staff.service';
import { User } from '../../models/user.model';
import { Token } from '@angular/compiler';
@Component({
  selector: 'app-planner-dashboard',
  templateUrl: './planner-dashboard.component.html',
  styleUrls: ['./planner-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule]
})

export class PlannerDashboardComponent implements OnInit {

  username!:string | null;
  taskForm!:FormGroup;
  showEvents: boolean = true;
  showTasks: boolean = false;
  events: Event[] = [];
  tasks: Task[] = [];
  staffs: User[]=[];
  newEvent: Event = {
    title: '',
    date: new Date(),
    location: '',
    description: '',
    status: 'In Progress',
    feedback: ''
  };
  newTask: Task = {
    description: '',
    status: 'In Progress',
    assignedStaff:''
  };
  selectedEvent: Event | null = null;
  selectedTask : Task| null = null;
  constructor(private plannerService: PlannerService,private staffService:StaffService, private router: Router) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.getEvents();
    this.getTasks();
    this.getStaff();
  }

  createEvent() {
    console.log(this.newEvent);
    this.plannerService.createEvent(this.newEvent).subscribe(
      response => {
        console.log('Event created successfully:', response);
        this.getEvents();
        this.newEvent = { title: '', date: new Date(), location: '', description: '', status: 'In Progress' ,feedback: ''};
      },
      error => {
        console.error('Event creation error:', error);
      }
    );
  }

  updateEvent() {
    if (this.selectedEvent && this.selectedEvent.id) {
      this.plannerService.updateEvent(this.selectedEvent, this.selectedEvent.id).subscribe(
        response => {
          console.log('Event updated successfully:', response);
          this.getEvents();
          this.selectedEvent = null;
        },
        error => {
          console.error('Event update error:', error);
        }
      );
    } else {
      console.error('No event selected or event id is missing.');
    }
  }

  getEvents() {
    this.plannerService.getEvents().subscribe(
response => {
this.events = response;
},
error => {
console.error('Error fetching events:', error);
}
);
}

 updateTaskStatus(taskId: any, status: string) {
  // Call staffService to update the status of the specified task and handle response
  this.staffService.updateTaskStatus(taskId, status).subscribe(
   (response) => {
    console.log('Task status updates', response);
    this.getTasks();
   },
   (error) => {
    console.error('Error updating task status', error);
   }
  );
  
 }


createTask() {
  console.log(this.newTask)
this.plannerService.createTask(this.newTask).subscribe(
response => {
console.log('Task created successfully:', response);
this.getTasks();
this.newTask = { description: '', status: '',assignedStaff:'' };
},
error => {
console.error('Task creation error:', error);
}
);
}

getTasks() {
this.plannerService.getTasks().subscribe(
response => {
this.tasks = response;
},
error => {
console.error('Error fetching tasks:', error);
}
);
}

editEvent(event: Event) {
this.selectedEvent = { ...event };
this.showEvents = true;
this.showTasks = false;
}
getStaff() {
this.staffService.getStaff().subscribe(
response => {
this.staffs = response;
},
error => {
console.error('Error fetching events:', error);
}
);

}
logout() {
localStorage.setItem('token', '');
localStorage.setItem('userId', '');
this.router.navigate(['/login']);
}

navigateTo(route: string) {
if (route === 'manage-events') {
this.showEvents = true;
this.showTasks = false;
} else if (route === 'manage-tasks') {
this.showEvents = false;
this.showTasks = true;
}
}
}