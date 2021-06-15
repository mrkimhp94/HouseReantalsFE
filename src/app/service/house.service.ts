import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {House} from "../model/House";

const API_URL = `${environment.apiUrl}`;
@Injectable()
export class HouseService {
  private test = ""

  constructor(private http: HttpClient) { }

  getAllHouse(): Observable<House[]> {
    return this.http.get<House[]>(`${API_URL}/houses`);
  }

  findByHouseId(houseId: number): Observable<House> {
    return this.http.get<House>(`${API_URL}/houses/detail/${houseId}`);
  }

}
