import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { API_URL } from './constants';

@Injectable({
  providedIn: 'root'
})
export class BooksService {


  private apiUrl = `${API_URL}/books`;

  constructor(private http: HttpClient) { }

  getBooks(details: String): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl+details);
  }

  getBook(id: string): Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Book>(url);
  }


  getBookByURL(url: string): Observable<Book> {
    const bookFromLS = localStorage.getItem(url);
    if (bookFromLS) return of(JSON.parse(bookFromLS));

    return this.http.get<Book>(url).pipe(
      map(book => {
        localStorage.setItem(url, JSON.stringify(book));
        return book;
      })
    );
  }
}
