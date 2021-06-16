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
  images :string[] =[];
  public style: 'width:500px;height:600px;' ;

  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute) { this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
    this.houseId = paramMap.get('houseId');
    this.getHouse(+this.houseId);
  }); }

  getHouse(houseId: number) {
    return this.houseService.findByHouseId(houseId).subscribe(house => {
      console.log(house)
      this.house = house;
      // for(let i =0;i<house.imagesList.length;i++){
      //   this.images.push(house.imageList[i])
      // }
      this.images = house.imagesList;
      console.log(this.images)
    });
  }

  ngOnInit() {

  }
}
