import { Injectable } from '@angular/core';
import {House} from '../../model/house';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Image} from '../../model/image';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
const API_URL = `${environment.api_url}`;
@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private http: HttpClient,
              private router: Router) { }
  createHouse(house): Observable<House> {
    return this.http.post<House>(API_URL + '/houses', house);
  }
  getAllHouse(): Observable<House[]> {
    return this.http.get<House[]>(API_URL + '/houses');
  }
  getHouse(id: number): Observable<House> {
    return this.http.get<House>(API_URL + `/houses/${id}`);
  }
  getAllHouseUsingPagination(page: number, size: number): Observable<House[]> {
    return this.http.get<House[]>(`${API_URL}/houses/pagination?page=${page}&size=${size}`);
  }
  getAllImageByHouse(id: number): Observable<Image[]> {
    return this.http.get<Image[]>(API_URL + `/houses/${id}/images`);
  }
  findByHouseId(houseId: number): Observable<House> {
    return this.http.get<House>(`${API_URL}/houses/detail/${houseId}`);
  }
}
