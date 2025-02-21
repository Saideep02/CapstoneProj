import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../services/staff.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class StaffDashboardComponent implements OnInit {
  tasks: Task[] = [];
  staffId: string | undefined;
  username!:string | null;

  constructor(private staffService: StaffService,private router:Router) {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId !== null) {
      this.staffId = storedUserId;
    }
  }

  ngOnInit() {
    this.getTasks(); 
    this.username = localStorage.getItem('username');
  }

  getTasks() {
    if (this.staffId) {
      this.staffService.getTasks(this.staffId).subscribe(
        (task: Task[]) => {
            this.tasks =task;
            this.tasks = this.tasks.sort((a,b)=> b.status.localeCompare(a.status));
        },
        (error) => {
          console.error('Error fetching tasks', error);
        }
        );
    } else {
      console.error('Staff ID is not available');
    }
  }

  logout() {
    localStorage.setItem('token', '');
   localStorage.setItem('userId', '');
   this.router.navigate(['/login']);
  }

  updateTaskStatus(taskId: any, status: string) {
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
}
