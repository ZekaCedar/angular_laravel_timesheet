import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimesheetComponent } from './components/timesheet/timesheet.component';
import {HttpClientModule} from '@angular/common/http';
import { TimesheetService } from './services/timesheet.service';

import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { TimesheetModalComponent } from './components/timesheet-modal/timesheet-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {path: 'timesheet/:id', component: TimesheetComponent },
  {path: 'search/:keyword', component: TimesheetComponent },
  {path: 'timesheet', component: TimesheetComponent },
  {path: 'timesheet', component: TimesheetComponent },
  {path: '', redirectTo:"/timesheet", pathMatch:'full' },
  {path: '**', redirectTo:"/timesheet", pathMatch:'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    TimesheetComponent,
    SearchComponent,
    TimesheetModalComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule],
  providers: [TimesheetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
