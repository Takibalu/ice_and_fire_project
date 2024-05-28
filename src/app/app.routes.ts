import { Routes } from '@angular/router';
import { MainComponent } from '../components/main/main.component';
import { BooksComponent } from '../components/books/books.component';
import { HousesComponent } from '../components/houses/houses.component';
import { CharactersComponent } from '../components/characters/characters.component';
import { BookDetailsComponent } from '../components/book-details/book-details.component';
import { CharacterDetailsComponent } from '../components/character-details/character-details.component';
import { HouseDetailsComponent } from '../components/house-details/house-details.component';

// Define the routes for the application
export const routes: Routes = [
    {path: '', component: MainComponent}, // Default route

    {path: 'books', component: BooksComponent}, // Route for displaying books
    {path: 'books/:id', component: BookDetailsComponent}, // Route for displaying details of a specific book
    
    {path: 'characters', component: CharactersComponent}, // Route for displaying characters
    {path: 'characters/:id', component: CharacterDetailsComponent}, // Route for displaying details of a specific character
    
    {path: 'houses', component: HousesComponent}, // Route for displaying houses
    {path: 'houses/:id', component: HouseDetailsComponent}, // Route for displaying details of a specific house
];
