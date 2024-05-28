import { Routes } from '@angular/router';
import { MainComponent } from '../components/main/main.component';
import { BooksComponent } from '../components/books/books.component';
import { HousesComponent } from '../components/houses/houses.component';
import { CharactersComponent } from '../components/characters/characters.component';
import { BookDetailsComponent } from '../components/book-details/book-details.component';
import { CharacterDetailsComponent } from '../components/character-details/character-details.component';
import { HouseDetailsComponent } from '../components/house-details/house-details.component';

export const routes: Routes = [
    {path: '', component: MainComponent},
    
    {path: 'books', component: BooksComponent},
    {path: 'books/:id', component:BookDetailsComponent},

    {path: 'characters', component: CharactersComponent},
    {path: 'characters/:id',component:CharacterDetailsComponent},

    {path: 'houses', component: HousesComponent},
    {path: 'houses/:id',component:HouseDetailsComponent},
];
