import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {HouseService} from '../../service/house/house.service';
import {House} from '../../model/House';
import {UserServiceService} from '../../service/user-service.service';
import {NotifyServiceService} from '../../service/notify/notify-service.service';


@Component({
  selector: 'my-list-house',
  templateUrl: 'list-house.html',
  styleUrls: ['./my-house.component.css']
})
export class OpenListHouse implements OnInit {
  myHouses: House[] = [];
  house: House;

  ngOnInit(): void {
    this.getAllMyHouse(this.userService.getCurrentUser().id);
  }

  constructor(private houseService: HouseService,
              private userService: UserServiceService) {

  }

  getAllMyHouse(id: number) {
    this.houseService.getAllHouseOfUser(id).subscribe(data => {
      this.myHouses = data;
    });
  }

  updateStatus(houseId: number, status: string) {
    this.houseService.findByHouseId(houseId).subscribe((data) => {
      data.houseStatus = status;
      console.log(data);
      this.houseService.upDateHouse(houseId, status).subscribe((data) => {
        alert('Update Success');
      });
    });
  }

  changeBlankStatus(houseId: number): any {
    return this.updateStatus(houseId, 'blank');
  }

  changeRentStatus(houseId: number) {
    return this.updateStatus(houseId, 'rent');
  }

  changeUpgradeStatus(houseId: number) {
    return this.updateStatus(houseId, 'upgrade');
  }

  checkingHouse(houseId: any): boolean {
    this.houseService.findByHouseId(houseId).subscribe((data) => {
      this.house = data;
    });
    return false;
  }

}

@Component({
  selector: 'my-house-popup',
  templateUrl: 'popup.html',
  styleUrls: ['./my-house.component.css']
})
export class PopUp implements OnInit {
  notify: any;
  ngOnInit(): void {
  }
  constructor(private notifyService : NotifyServiceService) {
  }
}
