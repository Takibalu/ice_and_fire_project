import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent implements OnInit{
  characters: any[] = [];
  public page = 1;

  constructor(private router: Router, private charactersService: CharactersService) { }

  ngOnInit(): void {
    this.fetchCharacters();
  }

  fetchCharacters(){
    this.charactersService.getCharacters(`?page=${this.page}&pageSize=10`)
    .subscribe((data: any[]) => {
      this.characters = data;
    });
  }

  nextPage() {
    this.page++;
    this.fetchCharacters();
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchCharacters();
    }
  }

  characterDetails(id:string){
    if(id) this.router.navigate(['/characters',id]);
  }
}
