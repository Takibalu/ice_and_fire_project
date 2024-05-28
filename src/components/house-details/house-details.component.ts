import { Component, OnInit } from '@angular/core';
import { House } from '../../models/house';
import { ActivatedRoute, Router } from '@angular/router';
import { HousesService } from '../../services/houses.service';
import { BooksService } from '../../services/books.service';
import { CharactersService } from '../../services/characters.service';
import { forkJoin } from 'rxjs';
import { Character } from '../../models/character';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css']
})
export class HouseDetailsComponent implements OnInit {
  public house!: House;
  public houseId!: string;
  public CadetBranches!: House[];
  public SwornMembers!: Character[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private charactersService: CharactersService,
    private housesService: HousesService
  ) {}

  ngOnInit(): void {
    this.houseId = this.route.snapshot.paramMap.get('id')!;
    if (this.houseId) {
      this.housesService.getHouse(this.houseId).subscribe(
        (data: House) => {
          this.house = data;
          if(this.house.currentLord) this.currentLord();
          if(this.house.heir) this.heir();
          if(this.house.overlord) this.overlord();
          if(this.house.founder) this.founder();
          if(this.house.cadetBranches) this.cadetBranches();
          if(this.house.swornMembers) this.swornMembers();
        },
        error => {
          console.error('Error fetching house details:', error);
          this.router.navigate(['/houses']);
        }
      );
    } else {
      this.router.navigate(['/houses']);
    }
  }
  
  currentLord(){
    this.charactersService.getCharacterByURL(this.house.currentLord)
    .subscribe(c=>{
      this.house.currentLord = c.name;
    });
  }
  heir(){
    this.charactersService.getCharacterByURL(this.house.heir)
    .subscribe(c=>{
      this.house.heir = c.name;
    });
  }
  overlord(){
    this.charactersService.getCharacterByURL(this.house.overlord)
    .subscribe(c=>{
      this.house.overlord = c.name;
    });
  }
  founder(){
    this.charactersService.getCharacterByURL(this.house.founder)
    .subscribe(c=>{
      this.house.founder = c.name;
    });
  }
  cadetBranches(){
    let houses = this.house.cadetBranches.map(url => this.housesService.getHouseByURL(url));
    forkJoin(houses).subscribe(h=>{
      this.house.cadetBranches = h.map(ho =>ho.name);
      this.CadetBranches =h;
    })
  }
  swornMembers(){
    let characters = this.house.swornMembers.map(url => this.charactersService.getCharacterByURL(url));
    forkJoin(characters).subscribe(c=>{
      this.house.swornMembers = c.map(ch =>ch.name);
      this.SwornMembers =c;
    })
  }

  houseDetailsFromStr(name: string): void {
    const foundHouse = this.CadetBranches.find(branch => branch.name === name);
    console.log(foundHouse);
    if (foundHouse && foundHouse.url) {
      const houseId = foundHouse.url.split('/').pop();
      console.log(houseId);
      if(houseId) this.router.navigate(['/houses',houseId]).then(()=>{
        window.location.reload();
      });
    } else {
      console.error('House not found:', name);
    }
  }
  characterDetailsFromStr(name: string): void {
    const foundCharacter = this.SwornMembers.find(member => member.name === name);
    console.log(foundCharacter);
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


