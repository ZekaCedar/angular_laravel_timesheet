import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Status } from '../common/status';


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  // private baseUrl = 'http://localhost:8080/api/1.0/status';
  private baseUrl = 'http://localhost:8000/api/status';

  constructor(private httpClient: HttpClient) { }

  getStatusList(): Observable<Status[]> {
    return this.httpClient
      .get<GetResponseStatus>(this.baseUrl)
      // .pipe(map((response) => response._embedded.status));
      .pipe(map((response) => response.data)); // Directly map to response.data
  }

}


interface GetResponseStatus {
  data: Status[];
  // _embedded: {
  //   status: Status[];
  // };
}