import { Component, Inject, InjectionToken, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TimesheetService } from 'src/app/services/timesheet.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Timesheet } from 'src/app/common/timesheet';
import { UserService } from 'src/app/services/user.service';
import { StatusService } from 'src/app/services/status.service';
import { Status } from 'src/app/common/status';
import { User } from 'src/app/common/user';
import * as moment from 'moment';

@Component({
  selector: 'app-timesheet-modal',
  templateUrl: './timesheet-modal.component.html',
  styleUrls: ['./timesheet-modal.component.css']
})
export class TimesheetModalComponent implements OnInit {

  timesheetFormGroup!: FormGroup;
  update: boolean = false;
  timesheetId: number = 0;
  statusList: Status[] = [];
  userList: User[] = [];
  selectedUserId: number = 0;
  selectedStatusId: number = 0;

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA'); // YYYY-MM-DD format
  }

  formatDateToMySQL(date: Date): string {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  }

  constructor(private formBuilder: FormBuilder,
              private timesheetService: TimesheetService,
              private userService: UserService,
              private statusService: StatusService,
              private router: Router,
              @Optional() public dialogRef: MatDialogRef<TimesheetModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any){
                console.log("this Data is from TimesheetModalComponent");
                console.log(data);
              }

  ngOnInit(): void {
    this.timesheetFormGroup = this.formBuilder.group({
      timesheet: this.formBuilder.group({
        id:[''],
        taskName:[''],
        projectName:[''],
        assignUser:[''],
        taskStatus:[''],
        taskStartDt:[''],
        taskEndDt:[''],
        category:['']
     /*    createUser:[''],
        createDate:[''],
        modifyUser:[''],
        modifyDate:[''],
        taskId:[''],
        statusId:[''] */
      })
    });

    // Populate the form if data is available
    if (this.data && this.data.timesheetData) {
      this.populateForm(this.data.timesheetData);
      // Set the flag based on the presence of an identifier (e.g., id)
      // this.update = !!this.data.timesheetData.id;
      this.update = !!this.data.timesheetData.data.id;
      // console.log(this.update);
      // this.timesheetId = this.data.timesheetData.id;
      this.timesheetId = this.data.timesheetData.data.id;
      // console.log(this.data.timesheetData.data.id);
    }

    // populate status drop down list
    this.statusService.getStatusList().subscribe(
      data => {
        console.log("Retrieved status data: "+ JSON.stringify(data));
        this.statusList = data;
      }
    )
    // populate assign user drop down list
    this.userService.getUserList().subscribe(
      data => {
        console.log("Retrieved status data: "+ JSON.stringify(data));
        this.userList = data;
      }
    )

  }


  populateForm(timesheetData: any) {
    console.log(timesheetData.data.taskStartDt);
    console.log(this.formatDate(timesheetData.data.taskStartDt));
    this.timesheetFormGroup.patchValue({
      timesheet: {
        // taskName: timesheetData.taskName,
        // projectName: timesheetData.projectName,
        // category: timesheetData.category,
        // assignUser: timesheetData.assignUser,
        // taskStatus: timesheetData.taskStatus,
        // taskStartDt: timesheetData.taskStartDt,
        // taskEndDt: timesheetData.taskEndDt
        taskName: timesheetData.data.taskName,
        projectName: timesheetData.data.projectName,
        category: timesheetData.data.category,
        assignUser: timesheetData.data.assignUser,
        taskStatus: timesheetData.data.taskStatus,
        taskStartDt: this.formatDate(timesheetData.data.taskStartDt),
        taskEndDt: this.formatDate(timesheetData.data.taskEndDt)
        // ... other fields ...
      }
    });
  }

  onSubmit(){
    console.log('Handling the submit button');
    console.log(this.timesheetFormGroup.get('timesheet')?.value);
    console.log("The Project Name is :" + this.timesheetFormGroup.get('timesheet')?.value.projectName);
    console.log(this.update);
    console.log(this.timesheetId);

    let TimesheetFormData = this.timesheetFormGroup.get('timesheet')?.value;
    debugger;
    const selectedUser = TimesheetFormData.assignUser;
    const selectedStatus = TimesheetFormData.taskStatus;
    console.log('Selected value on submit:', selectedUser);
    console.log('Selected value on submit:', selectedStatus);
    console.log(this.userList);
    console.log(this.statusList);

    // Object.values(this.userList).forEach(user => {
    //   debugger;
    //   if(user.userName == selectedUser){
    //     console.log('User ID:' ,user.id, 'Username:', user.userName);
    //   }
    // });

    this.userList.forEach(user => {
      // debugger;
      if(user.userName == selectedUser){
        console.log('User ID:' ,user.id, 'User:', user.userName);
        this.selectedUserId = user.id;
      }
    });

    this.statusList.forEach(status => {
      // debugger;
      if(status.statusName == selectedStatus){
        console.log('Status ID:' ,status.id, 'Status:', status.statusName);
        this.selectedStatusId = status.id;
      }
    });

    let timesheet = new Timesheet(
      TimesheetFormData.Id,
      TimesheetFormData.taskName,
      TimesheetFormData.projectName,
      TimesheetFormData.category,
      TimesheetFormData.assignUser,
      TimesheetFormData.taskStatus,
      // new Date(TimesheetFormData.taskStartDt),
      moment(TimesheetFormData.taskStartDt).format('YYYY-MM-DD HH:mm:ss'),
      // new Date(TimesheetFormData.taskEndDt),
      moment(TimesheetFormData.taskEndDt).format('YYYY-MM-DD HH:mm:ss'),
      // TimesheetFormData.createUser="siti",
      // TimesheetFormData.createDate = new Date(""),
      // TimesheetFormData.modifyUser = "null",
      // TimesheetFormData.modifyDate = new Date(""),
      TimesheetFormData.userId = this.selectedUserId,
      TimesheetFormData.statusId = this.selectedStatusId
    );

    console.log(timesheet);
    
    if(this.update){
      this.handleUpdateTimesheet(this.timesheetId, timesheet);
    }else{
      this.handleCreateTimesheet(timesheet);
    }

  }

   // refactor section

  private handleCreateTimesheet(timesheet: Timesheet) {
    this.timesheetService.createTimesheet(timesheet).subscribe(
      {
        next: response => {
          this.onNoClick();
          alert(`Your Timesheet is sucessfully created`);
          // this.timesheetService.notifyTimesheetCreation(timesheet);
          // this.timesheetService.
        },
        error: err => {
          this.onNoClick();
          alert(`There was an error: ${err.message}`);
        }
      }
    );
  }

  private handleUpdateTimesheet(timesheetId:number, timesheet: Timesheet) {
    // Call REST API via TimesheetService
    this.timesheetService.updateTimesheet(timesheetId, timesheet).subscribe(
      {
        next: response => {
          this.onNoClick();
          alert(`Your Timesheet is sucessfully updated`);
        },
        error: err => {
          this.dialogRef.close();
          alert(`There was an error: ${err.message}`);
        }
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

