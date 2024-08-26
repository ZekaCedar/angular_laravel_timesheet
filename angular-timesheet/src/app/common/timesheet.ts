export class Timesheet {

  constructor(
              public id : number,
              public taskName: string,
              public projectName: string,
              public category: string,
              public assignUser: string,
              public taskStatus: string,
              // public taskStartDt: Date,
              // public taskEndDt: Date,
              public taskStartDt: string,
              public taskEndDt: string,
              // public createUser: string,
              // public createDate: Date,
              // public modifyUser: string,
              // public modifyDate: Date,
              public userId: number,
              public statusId: number,
              ){
              }

}
