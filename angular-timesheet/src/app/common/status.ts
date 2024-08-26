export class Status {
id: any;

  constructor(public Id: number,
              public statusGrp: string,
              public statusName: string,
              public createUser: string,
              public createDt: Date,
              public modifyUser: string,
              public modifyDt: Date){
              }

}
