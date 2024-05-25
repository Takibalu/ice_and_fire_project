import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { API_URL } from './constants';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apiUrl = `${API_URL}/books`;

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Book>(url);
  }
}
