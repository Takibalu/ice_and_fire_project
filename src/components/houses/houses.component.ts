import { Component, OnInit } from '@angular/core';
import { HousesService } from '../../services/houses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent implements OnInit {
  houses: any[] = [];
  public page = 1;

  constructor(private router: Router, private housesService: HousesService) { }

  ngOnInit(): void {
    this.fetchHouses();
  }

  fetchHouses() {
    this.housesService.getHouses(`?page=${this.page}&pageSize=8`)
    .subscribe((data: any[]) => {
      this.houses = data;
    });
  }

  nextPage() {
    this.page++;
    this.fetchHouses();
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchHouses();
    }
  }

  houseDetails(id:string){
    if(id) this.router.navigate(['/houses',id]);
  }

}
