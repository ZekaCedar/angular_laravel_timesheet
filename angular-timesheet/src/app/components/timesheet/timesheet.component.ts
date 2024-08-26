import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Timesheet } from 'src/app/common/timesheet';
import { TimesheetService } from 'src/app/services/timesheet.service';
import { MatDialog } from '@angular/material/dialog';
import { TimesheetModalComponent } from '../timesheet-modal/timesheet-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet-table.component.html',
  //templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
})
export class TimesheetComponent implements OnInit {
  timesheet: Timesheet[] = [];
  currentTaskName: string | null | undefined;
  searchMode: boolean = false;

  // private timesheetCreateSubscription: Subscription = new Subscription();

  constructor(
    private timesheetService: TimesheetService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    // this.timesheetCreateSubscription =
    //   timesheetService.timesheetCreated.subscribe((createdTimesheet) => {
    //     if (createdTimesheet !== null) {
    //       this.timesheet.push(createdTimesheet);
    //     }
    //   });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listTimesheet();
    });
  }

  listTimesheet() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchTimesheet();
    } else {
      this.handleListTimesheet();
    }
  }

  editTimesheet(theId: number): void {
    this.timesheetService.getTimesheetById(theId).subscribe((timesheetData) => {
      console.log('this Data is from when user click the edit button');
      console.log(timesheetData);

      const dialogRef = this.dialog.open(TimesheetModalComponent, {
        width: '950px',
        // data: { /* data you might want to pass to the dialog */ }
        data: { timesheetData /* Pass the fetched timesheet data here*/ },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        // handle result if needed
      });
    });
  }

  deleteTimesheet(theId: number) {
    console.log(theId);

    // Call REST API via TimesheetService
    this.timesheetService.deleteTimesheet(theId).subscribe({
      next: (response) => {
        alert(`Your Timesheet is sucessfully deleted`);
        this.handleListTimesheet();
      },
      error: (err) => {
        alert(`There was an error: ${err.message}`);
      },
    });
  }

  handleSearchTimesheet() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // now search for the products using keyword
    this.timesheetService.searchTimesheet(theKeyword).subscribe((data) => {
      this.timesheet = data;
    });
  }

  handleListTimesheet() {
    //check if "taskName" parameter is available
    const hasTaskName: boolean = this.route.snapshot.paramMap.has('taskName');

    if (hasTaskName) {
      // get the "taskName" param string. if number convert to string using the "+" symbol
      this.currentTaskName = this.route.snapshot.paramMap.get('taskName');
    } else {
      // default to Any "Create.." taskName
      this.currentTaskName = '';
    }

    this.timesheetService
      .getTimesheetList(this.currentTaskName)
      .subscribe((data) => {
        console.log(data);
        this.timesheet = data;
      });
  }
}
