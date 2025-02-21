import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { httpClientProviders } from './http-client-providers';
import { StaffDashboardComponent } from './components/staff-dashboard/staff-dashboard.component';
import { PlannerDashboardComponent } from './components/planner-dashboard/planner-dashboard.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterComponent,
    LoginComponent,

    PlannerDashboardComponent,
    StaffDashboardComponent,
    ClientDashboardComponent
    
  ],
  providers: [
    httpClientProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


