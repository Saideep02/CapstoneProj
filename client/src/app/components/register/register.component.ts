import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User,Credentials } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule]
})
export class RegisterComponent {
  msg!:boolean;
  user: User = {
    username: '',
    email: '',
    password: '',
    role: 'PLANNER'
  };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe(
      response => {
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration error:', error);
         this.msg = true;
      }
    );
  }
  
  onClick(){
    this.router.navigate(['/login']);
  }
}