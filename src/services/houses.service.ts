import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { House } from '../models/house';
import { API_URL } from './constants';

@Injectable({
  providedIn: 'root'
})
export class HousesService {

  private apiUrl = `${API_URL}/houses`;

  constructor(private http: HttpClient) { }

  getHouses(): Observable<House[]> {
    return this.http.get<House[]>(this.apiUrl);
  }

  getHouse(id: number): Observable<House> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<House>(url);
  }
}
