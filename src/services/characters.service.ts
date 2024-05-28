import { Injectable } from '@angular/core';
import { API_URL } from './constants';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private apiUrl = `${API_URL}/characters`;

  constructor(private http: HttpClient) { }

  getCharacters(details: String): Observable<Character[]> {
    return this.http.get<Character[]>(this.apiUrl+details);
  }

  getCharacter(id: string): Observable<Character> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Character>(url);
  }

  getCharacterByURL(url: string): Observable<Character> {
    const characterFromLS = localStorage.getItem(url);
    if (characterFromLS) return of(JSON.parse(characterFromLS));
  
    return this.http.get<Character>(url).pipe(
      map(character => {
        localStorage.setItem(url, JSON.stringify(character));
        return character;
      })
    );
  }
  
}