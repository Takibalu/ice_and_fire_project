import { Injectable } from '@angular/core';
import { API_URL } from './constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private apiUrl = `${API_URL}/characters`;

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.apiUrl);
  }

  getCharacter(id: number): Observable<Character> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Character>(url);
  }
}