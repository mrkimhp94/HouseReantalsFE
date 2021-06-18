import { Component, OnInit } from '@angular/core';

import {Image} from '../../model/image';
import {HouseService} from '../../service/house/house.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {House} from '../../model/house';
import {Subscription} from 'rxjs';




@Component({
  selector: 'app-detail-house',
  templateUrl: './detail-house.component.html',
  styleUrls: ['./detail-house.component.css']
})
export class DetailHouseComponent implements OnInit {
  houseId?: any;
  house: House;
  images :Image[] =[];
  public style: 'width:500px;height:600px;' ;
  private imgUrl: any;
  sub: Subscription;

  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe(async (paramMap: ParamMap) => {
      this.houseId = +paramMap.get('houseId');
      this.house = await this.getHouse(this.houseId);
      this.getAllImageByHouse(this.house);
    }); }

  getHouse(houseId: number) {
    return this.houseService.findByHouseId(houseId).toPromise()
    // .subscribe(house => {
    // console.log(house)
    // this.house = house;
    // // for(let i =0;i<house.imagesList.length;i++){
    // //   this.images.push(house.imageList[i])
    // // }
    // this.images = house.imagesList;
    // console.log(this.images)
    // });
  }

  ngOnInit() {

  }
  getAllImageByHouse(house: House) {
    this.houseService.getAllImageByHouse(house.houseId).subscribe(listImage => {
      this.images = listImage;
      this.imgUrl = listImage[0].linkImage;
    })
  }
}
