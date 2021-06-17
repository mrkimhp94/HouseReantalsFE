import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {HouseService} from '../../service/house/house.service';
import {House} from '../../model/House';

@Component({
  selector: 'my-house',
  templateUrl: './my-house.component.html',
  styleUrls: ['./my-house.component.css']
})
export class MyHouseComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  showMyHouse() {
    this.dialog.open(OpenListHouse);
  }
}

@Component({
  selector: 'my-list-house',
  templateUrl: 'list-house.html',
  styleUrls: ['./my-house.component.css']
})
export class OpenListHouse implements OnInit {
  myHouses: House[] = [];

  ngOnInit(): void {
    this.getAllMyHouse(1);
  }

  constructor(private houseService: HouseService) {

  }

  getAllMyHouse(id: number) {
    this.houseService.getAllHouseOfUser(id).subscribe(data => {
      this.myHouses = data;
    });
  }

  changeBlankStatus(houseId: number) {

  }

  changeRentStatus(houseId: number) {

  }

  changeUpgradeStatus(houseId: number) {

  }

  // checkingHouseStatus(): boolean {
  //
  // }
}
