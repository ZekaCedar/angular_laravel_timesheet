import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TimesheetModalComponent } from '../timesheet-modal/timesheet-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  //@ViewChild('modalComponent')modalComponent!: TimesheetModalComponent;
  //modalRef: MdbModalRef<TimesheetModalComponent> | null = null;

  constructor(private router:Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  doSearch(value:string){
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }

  // openModal() {
  //   // this.modalComponent.openModal();
  //   this.modalRef = this.modalService.open(TimesheetModalComponent)
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open(TimesheetModalComponent, {
      width: '950px',
      data: { /* data you might want to pass to the dialog */ }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // handle result if needed
    });
  }
  


}
