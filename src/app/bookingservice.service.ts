import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';

const API_URL = `${environment.api_url}`;

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  constructor(private http: HttpClient) {
  }


  public getAll(): Observable<any> {
    return this.http.get(API_URL);
  }
  public getBookingByHouseId(houseId:any): Observable<any>{
    return  this.http.get(API_URL+"/house/"+houseId)
  }
  public doBooking(booking : any) : Observable<any>{
    return  this.http.post(API_URL,booking)
  }
}
