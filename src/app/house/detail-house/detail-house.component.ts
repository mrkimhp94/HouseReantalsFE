import {Component, OnInit} from '@angular/core';

import {Image} from '../../model/image';
import {HouseService} from '../../service/house/house.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {House} from '../../model/house';
import {BookingServiceService} from '../../service/booking/bookingservice.service';


@Component({
  selector: 'app-detail-house',
  templateUrl: './detail-house.component.html',
  styleUrls: ['./detail-house.component.css']
})
export class DetailHouseComponent implements OnInit {
  houseId?: any;
  house: House;
  images: string[] = [];
  public style: 'width:500px;height:600px;';

  constructor(private houseService: HouseService, private bookingService: BookingServiceService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.houseId = paramMap.get('houseId');
      this.getHouse(+this.houseId);
      this.bookingService.currentId = this.houseId;
    });
  }

  getHouse(houseId: number) {
    return this.houseService.findByHouseId(houseId).subscribe(house => {
      console.log('house-detail');
      console.log(house);
      console.log('house-detail');
      this.houseService.currentHouse = house;
      this.house = house;
      this.images = house.imagesList;
    });
  }

  ngOnInit() {

  }
}
