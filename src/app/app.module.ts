// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from '../components/main/main.component';
import { BooksComponent } from '../components/books/books.component';
import { HousesComponent } from '../components/houses/houses.component';
import { CharactersComponent } from '../components/characters/characters.component';
import { routes } from './app.routes';
import { BooksService } from '../services/books.service';
import { CharactersService } from '../services/characters.service';
import { HousesService } from '../services/houses.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HouseDetailsComponent } from '../components/house-details/house-details.component';
import { BookDetailsComponent } from '../components/book-details/book-details.component';
import { CharacterDetailsComponent } from '../components/character-details/character-details.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [
    // Declare all the components used in the application
    AppComponent,
    MainComponent,
    BooksComponent,
    BookDetailsComponent,
    CharactersComponent,
    CharacterDetailsComponent,
    HousesComponent,
    HouseDetailsComponent,
  ],
  imports: [
    // Import Angular and third-party modules required for the application
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    RouterModule.forRoot(routes) // Set up routing with defined routes
  ],
  providers:[
    // Register services and any providers needed for dependency injection
    BooksService,
    CharactersService,
    HousesService,
    provideAnimationsAsync(), // Enable asynchronous animations
  ],
  bootstrap: [AppComponent] // Define the root component that Angular should bootstrap
})
export class AppModule {}