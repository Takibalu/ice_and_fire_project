import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/character';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from '../../services/characters.service';
import { HousesService } from '../../services/houses.service';
import { forkJoin } from 'rxjs';
import { House } from '../../models/house';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent implements OnInit {
  public character!: Character;
  public characterId!: string;
  public Allegiances!: House[];
  public Books!: Book[];
  public PovBooks!: Book[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService,
    private charactersService: CharactersService,
    private housesService: HousesService,
  ) {}
  ngOnInit(): void {
    this.characterId = this.route.snapshot.paramMap.get('id')!;
    if (this.characterId) {
      this.charactersService.getCharacter(this.characterId).subscribe(
        (data: Character) => {
          this.character = data;
          if(this.character.father) this.father();
          if(this.character.mother) this.mother();
          if(this.character.spouse) this.spouse();
          if(this.character.allegiances) this.allegiances();
          if(this.character.books) this.books();
          if(this.character.povBooks) this.povBooks();
        },
        error => {
          console.error('Error fetching character details:', error);
          this.router.navigate(['/characters']);
        }
      );
    } else {
      this.router.navigate(['/characters']);
    }
  }
  mother() {
    this.charactersService.getCharacterByURL(this.character.mother)
    .subscribe(c=>{
      this.character.mother = c.name;
    })
  }
  povBooks() {
    let books = this.character.povBooks.map(url => this.booksService.getBookByURL(url));
    forkJoin(books).subscribe(b=>{
      this.character.povBooks = b.map(bo =>bo.name);
      this.PovBooks =b;
    })
  }
  books() {
    let books = this.character.books.map(url => this.booksService.getBookByURL(url));
    forkJoin(books).subscribe(b=>{
      this.character.books = b.map(bo =>bo.name);
      this.Books =b;
    })
  }
  allegiances() {
    let houses = this.character.allegiances.map(url => this.housesService.getHouseByURL(url));
    forkJoin(houses).subscribe(h=>{
      this.character.allegiances = h.map(ho =>ho.name);
      this.Allegiances =h;
    })
  }
  spouse() {
    this.charactersService.getCharacterByURL(this.character.spouse)
    .subscribe(c=>{
      this.character.spouse = c.name;
    })
  }
  father() {
    this.charactersService.getCharacterByURL(this.character.father)
    .subscribe(c=>{
      this.character.father = c.name;
    })
  }

  bookDetailsFromStr(name: string): void {
    let foundBook = this.Books.find(branch => branch.name === name);
    if(foundBook==null) foundBook = this.PovBooks.find(branch =>branch.name === name)
    if (foundBook && foundBook.url) {
      const bookId = foundBook.url.split('/').pop();
      if(bookId) this.router.navigate(['/books',bookId]).then(()=>{
        window.location.reload();
      });
    } else {
      console.error('Book not found:', name);
    }
  }

  houseDetailsFromStr(name: string): void {
    let foundHouse = this.Allegiances.find(branch => branch.name === name);
    if (foundHouse && foundHouse.url) {
      const houseId = foundHouse.url.split('/').pop();
      if(houseId) this.router.navigate(['/houses',houseId]).then(()=>{
        window.location.reload();
      });
    } else {
      console.error('House not found:', name);
    }
  }

}
