import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {delay, map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  url = `${environment.api_url}`;

  constructor(private http: HttpClient) {
  }

  getUserInformation(id: any) {
    return this.http.get(this.url + `/${id}`);
  }

  getCurrentUser() {
    return JSON.parse(window.localStorage.getItem('currentUser'));
  }

  // checkIfUsernameExists(username: string): Observable<boolean> {
  //   return this.checkUsername(username).pipe(delay(1000));
  // }

  checkUsername(username: string): Observable<boolean> {
    return  this.http.get<boolean>(this.url + `/checkusername/${username}`).pipe();
  }
  checkEmail(email: string): Observable<boolean> {
    return  this.http.get<boolean>(this.url + `/checkemail/${email}`).pipe();
  }
  checkPhone(phone: string): Observable<boolean> {
    return  this.http.get<boolean>(this.url + `/checkphone/${phone}`).pipe();
  }

  // usernameValidator(): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
  //     return this.checkUsername(control.value).pipe(
  //       map(res => {
  //         console.log(res);
  //         // if res is true, username exists, return true
  //         return res ? { usernameExists: true } : null;
  //         // NB: Return null if there is no error
  //       })
  //     );
  //   };
  // }
}
