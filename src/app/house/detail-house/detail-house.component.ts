import { Component, OnInit } from '@angular/core';

import {Image} from '../../model/image';
import {HouseService} from '../../service/house/house.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {House} from '../../model/house';




@Component({
  selector: 'app-detail-house',
  templateUrl: './detail-house.component.html',
  styleUrls: ['./detail-house.component.css']
})
export class DetailHouseComponent implements OnInit {
  houseId?: any;
  house: House;
  listImage: Image[] = [];
  public style: 'width:500px;height:600px;' ;

  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute) { this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
    this.houseId = paramMap.get('houseId');
    this.getHouse(+this.houseId);
  }); }

  getHouse(houseId: number) {
    return this.houseService.findByHouseId(houseId).subscribe(house => {
      this.house = house;
      this.listImage = house.imageList;
    });
  }

  ngOnInit() {

  }
}
