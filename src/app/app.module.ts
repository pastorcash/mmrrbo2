import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AlertModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocationsComponent } from './locations/locations.component';
import { TeachersComponent } from './teachers/teachers.component';
import { StudentsComponent } from './students/students.component';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { TeacherListComponent } from './teachers/teacher-list/teacher-list.component';
import { LocationDetailComponent } from './locations/location-detail/location-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    LocationsComponent,
    TeachersComponent,
    StudentsComponent,
    LocationListComponent,
    ContactsComponent,
    StudentListComponent,
    TeacherListComponent,
    LocationDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
