import { Component, OnInit } from '@angular/core';

import {HouseService} from '../../service/house/house.service';
import {House} from '../../model/house';




@Component({
  selector: 'app-list-house',
  templateUrl: './list-house.component.html',
  styleUrls: ['./list-house.component.css']
})
export class ListHouseComponent implements OnInit {
  public currentPage = 0;
  public size = 9;
  // public course: any[];


  private listHouse: House[] = [];
  private numberOfPage = 1;


  get filteredListHouse() {
    const startIndex = this.currentPage * this.size;
    const endIndex = (this.currentPage + 1) * this.size;
    return this.listHouse.slice(startIndex, endIndex);
    }


  constructor(private houseService: HouseService) { }

  get pageArray() {
    const pages = [...Array(this.numberOfPage).keys()];
    return Array.from(pages.map(page => page + 1));
  }

  ngOnInit() {
    this.getAllHouse();
  }

  getAllHouse() {
    this.houseService.getAllHouse().subscribe(listHouse => {
      this.listHouse = listHouse;
      this.numberOfPage = Math.ceil(this.listHouse.length / this.size);
    });
  }
  next() {
    if (this.currentPage < this.numberOfPage - 1) {
      this.currentPage++;
    }
  }

  previous(){
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  public goTo(page) {
    this.currentPage = page;
  }

  search() {
  }
}
