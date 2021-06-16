import {Component, OnInit} from '@angular/core';

import {Booking} from '../../model/booking';
import {MatDialog} from '@angular/material/dialog';
import * as moment from 'moment';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {BookingServiceService} from '../../service/booking/bookingservice.service';

@Component({
  selector: 'my-booking',
  templateUrl: './my-booking.component.html',
  // styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent implements OnInit {
  constructor(private bookingService: BookingServiceService, private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  open() {
    this.dialog.open(BookingList);
  }
}

@Component({
  selector: 'booking-list',
  templateUrl: 'booking-list.html',
  styleUrls: ['./my-booking.component.css']
})
export class BookingList implements OnInit {
  bookingList: Booking[] = [];
  bookingId: string;

  constructor(private bookingService: BookingServiceService, private dialog: MatDialog, private activeRouter: ActivatedRoute) {

  }
  getAll() {
    this.bookingService.getAll().subscribe(data => {
      // this.bookingList = data;
      for (let i = 0; i < data.length; i++) {
        data[i].checkinDate = this.formatDate(data[i].checkinDate);
        data[i].checkoutDate = this.formatDate(data[i].checkoutDate);
        this.bookingList.push(data[i]);
      }
      console.log(this.bookingList);
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  formatDate(date: any): any {
    return (moment(date)).format('yyyy-MM-DD');
  }
  deleteBooking(id: any) {
    this.activeRouter.paramMap.subscribe((paramMap: ParamMap) => {
      this.bookingId = paramMap.get('id');
      console.log(this.bookingId)
    });
    this.bookingService.deleteBooking(id).subscribe(
      () => {
        console.log('delete success');
      }
    );
  }
}
