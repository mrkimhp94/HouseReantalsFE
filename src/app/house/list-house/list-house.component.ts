import { Component, OnInit } from '@angular/core';

import {HouseService} from '../../service/house/house.service';
import {House} from '../../model/house';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';




@Component({
  selector: 'app-list-house',
  templateUrl: './list-house.component.html',
  styleUrls: ['./list-house.component.css']
})
export class ListHouseComponent implements OnInit {
  public currentPage = 0;
  public size = 9;
  private listHouse: House[] = [];
  private numberOfPage = 1;
  searchForm: FormGroup = new FormGroup({
    search: new FormControl(''),
    checkin: new FormControl(''),
    checkout: new FormControl('')
  });


  get filteredListHouse() {
    const startIndex = this.currentPage * this.size;
    const endIndex = (this.currentPage + 1) * this.size;
    return this.listHouse.slice(startIndex, endIndex);
    }


  constructor(private houseService: HouseService,
              private router: Router) { }

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
    const search = this.searchForm.value.search;
    const checkin = this.searchForm.value.checkin;
    const checkout = this.searchForm.value.checkout;
    this.houseService.getSearchHouse(search, checkin, checkout).subscribe(listHouse => {
      this.listHouse = listHouse;
      this.addImageToHouse(this.listHouse);
      this.router.navigate(['/houses'], {queryParams: {search: search, checkin: checkin, checkout: checkout}});
  });
  }

  private addImageToHouse(listHouse: House[]) {
    listHouse.map(async house => {
      house.imagesList = await this.getAllImageByProduct(house);
    });
  }

  private async getAllImageByProduct(house: House) {
    return this.houseService.getAllImageByHouse(house.houseId).toPromise();

  }
}
