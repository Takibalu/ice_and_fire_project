import { Component, OnInit } from '@angular/core';
import { HousesService } from '../../services/houses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrl: './houses.component.css'
})
export class HousesComponent implements OnInit {

  houses: any[] = [];

  constructor(private router: Router, private housesService: HousesService) { }

  ngOnInit(): void {
    this.housesService.getHouses().subscribe((data: any[]) => {
      this.houses = data;
    });
  }
}
