import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit{
  books: any[] = [];
  public page = 1;

  constructor(private router: Router, private booksService: BooksService) { }

  ngOnInit(): void {
    this.fetchBooks();
  }
  fetchBooks(){
    this.booksService.getBooks(`?page=${this.page}&pageSize=15`)
    .subscribe((data: any[]) => {
      this.books = data;
    });
  }

  bookDetails(id:string){
    if(id) this.router.navigate(['/books',id]);
  }
}
