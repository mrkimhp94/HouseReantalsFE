import { Component, OnInit } from '@angular/core';
import {HouseService} from "../../service/house.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {House} from "../../model/House";
import {Subscription} from "rxjs";
import {Images} from "../../model/Images";

@Component({
  selector: 'app-detail-house',
  templateUrl: './detail-house.component.html',
  styleUrls: ['./detail-house.component.css']
})
export class DetailHouseComponent implements OnInit {
  houseId? : any;
  house : House;
  listImage :Images[]=[];
  public style : "width:500px;height:600px;" ;

  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute) { this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
    this.houseId = paramMap.get('houseId');
    this.getHouse(+this.houseId);
  }); }

  getHouse(houseId: number) {
    return this.houseService.findByHouseId(houseId).subscribe(house => {
      this.house = house;
      this.listImage = house.imagesList;
    });
  }

  ngOnInit() {

  }
}
