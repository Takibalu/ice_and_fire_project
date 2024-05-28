import { Injectable } from '@angular/core';
import { API_URL } from './constants';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private apiUrl = `${API_URL}/characters`; // Set the base URL for the characters API

  constructor(private http: HttpClient) { }

  // Fetch a list of characters, optionally including details
  getCharacters(details: String): Observable<Character[]> {
    return this.http.get<Character[]>(this.apiUrl + details);
  }

  // Fetch details of a specific character by ID
  getCharacter(id: string): Observable<Character> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Character>(url);
  }

  // Fetch details of a specific character by URL and cache it in local storage
  getCharacterByURL(url: string): Observable<Character> {
    const characterFromLS = localStorage.getItem(url); // Check if data is in local storage
    if (characterFromLS) return of(JSON.parse(characterFromLS)); // Return cached data if available
  
    return this.http.get<Character>(url).pipe(
      map(character => {
        localStorage.setItem(url, JSON.stringify(character)); // Cache data in local storage
        return character;
      })
    );
  }
  
}