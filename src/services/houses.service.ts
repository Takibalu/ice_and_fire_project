import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { House } from '../models/house';
import { API_URL } from './constants';

@Injectable({
  providedIn: 'root'
})
export class HousesService {

  private apiUrl = `${API_URL}/houses`;

  constructor(private http: HttpClient) { }

  getHouses(details: String): Observable<House[]> {
    return this.http.get<House[]>(this.apiUrl+details);
  }

  getHouse(id: string): Observable<House> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<House>(url);
  }
  getHouseByURL(url: string): Observable<House> {
    const houseFromLS = localStorage.getItem(url);
    if (houseFromLS) return of(JSON.parse(houseFromLS));
  
    return this.http.get<House>(url).pipe(
      map(house => {
        localStorage.setItem(url, JSON.stringify(house));
        return house;
      })
    );
  }
}
