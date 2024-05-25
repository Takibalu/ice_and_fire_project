import { Component, OnInit } from '@angular/core';
import { HousesService } from '../../services/houses.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrl: './houses.component.css'
})
export class HousesComponent implements OnInit {

  houses: any[] = [];

  constructor(private housesService: HousesService) { }

  ngOnInit(): void {
    this.housesService.getHouses().subscribe((data: any[]) => {
      this.houses = data;
    });
  }
}
