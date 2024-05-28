import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { CharactersService } from '../../services/characters.service';
import { HousesService } from '../../services/houses.service';
import { Book } from '../../models/book';
import { Character } from '../../models/character';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit{

  public book!: Book; 
  public bookId!: string;
  public Characters!: Character[];
  public PovCharacters!: Character[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService,
    private charactersService: CharactersService,
  ) {}
  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id')!;
    if(this.bookId){
      this.booksService.getBook(this.bookId).subscribe(
        (data: Book) =>{
          this.book = data;
          if(this.book.characters) this.characters();
          if(this.book.povCharacters) this.povCharacters();
        },
        error => {
          console.error('Error fetching book details:', error);
          this.router.navigate(['/books']);
        }
      );
    } else {
      this.router.navigate(['/books']);
    }
  }
  povCharacters() {
    let characters = this.book.povCharacters.map(url => this.charactersService.getCharacterByURL(url));
    forkJoin(characters).subscribe(c=>{
      this.book.povCharacters = c.map(ch =>ch.name);
      this.PovCharacters =c;
    })
  }
  characters() {
    let characters = this.book.characters.map(url => this.charactersService.getCharacterByURL(url));
    forkJoin(characters).subscribe(c=>{
      this.book.characters = c.map(ch =>ch.name);
      this.Characters =c;
    })
  }

  characterDetailsFromStr(name: string): void {
    let foundCharacter = this.Characters.find(member => member.name === name);
    if(foundCharacter==null) 
      foundCharacter = this.PovCharacters.find(member => member.name === name);
    if (foundCharacter && foundCharacter.url) {
      const characterId = foundCharacter.url.split('/').pop();
      console.log(characterId);
      if(characterId) this.router.navigate(['/characters',characterId]).then(()=>{
        window.location.reload();
      });
    } else {
      console.error('Character not found:', name);
    }
  }
}
