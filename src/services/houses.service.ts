import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { House } from '../models/house';
import { API_URL } from './constants';

@Injectable({
  providedIn: 'root'
})
export class HousesService {

  private apiUrl = `${API_URL}/houses`; // Set the base URL for the houses API

  constructor(private http: HttpClient) { }

  // Fetch a list of houses, optionally including details
  getHouses(details: String): Observable<House[]> {
    return this.http.get<House[]>(this.apiUrl + details);
  }

  // Fetch details of a specific house by ID
  getHouse(id: string): Observable<House> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<House>(url);
  }

  // Fetch details of a specific house by URL and cache it in local storage
  getHouseByURL(url: string): Observable<House> {
    const houseFromLS = localStorage.getItem(url); // Check if data is in local storage
    if (houseFromLS) return of(JSON.parse(houseFromLS)); // Return cached data if available
  
    return this.http.get<House>(url).pipe(
      map(house => {
        localStorage.setItem(url, JSON.stringify(house)); // Cache data in local storage
        return house;
      })
    );
  }
}

