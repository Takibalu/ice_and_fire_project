import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  books: any[] = [];

  constructor(private router: Router, private booksService: BooksService) { }

  ngOnInit(): void {
    this.booksService.getBooks().subscribe((data: any[]) => {
      this.books = data;
    });
  }
}
