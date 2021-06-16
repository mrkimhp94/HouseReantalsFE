import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

const API_URL = `${environment.api_url}`;

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {
currentId : number;
  constructor(private http: HttpClient) {
  }
  public getAll(): Observable<any> {
    return this.http.get(API_URL+'/bookings');
  }
  public getBookingByHouseId(houseId:any): Observable<any>{
    return  this.http.get(API_URL+`/bookings/house/${houseId}`)
  }
  public doBooking(booking : any) : Observable<any>{
    return  this.http.post(API_URL+`/bookings`,booking)
  }
  public deleteBooking(id:any):Observable<any>{
    return  this.http.delete(API_URL+`/bookings/${id}`);

  }
}
