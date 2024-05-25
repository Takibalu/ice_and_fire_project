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

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BooksComponent,
    HousesComponent,
    CharactersComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule, // Add MatIconModule here
    RouterModule.forRoot(routes)
  ],
  providers:[
    BooksService,
    CharactersService,
    HousesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
