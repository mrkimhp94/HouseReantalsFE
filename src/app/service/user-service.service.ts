import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
url =`${environment.api_url}`
  constructor(private http : HttpClient) { }
  getUserInformation(id : any){
  return this.http.get(this.url + `/${id}`)
  }
  getCurrentUser(){
  return JSON.parse(window.localStorage.getItem('currentUser'))
  }
}
