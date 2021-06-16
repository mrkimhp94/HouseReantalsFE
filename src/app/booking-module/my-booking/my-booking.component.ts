import {Component, OnInit} from '@angular/core';
import {BookingServiceService} from '../../bookingservice.service';
import {Booking} from '../../model/booking';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent implements OnInit {
  bookingList: Booking[] = [];

  constructor(private bookingService: BookingServiceService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.bookingService.getAll().subscribe(data => {
      this.bookingList = data;
      console.log(this.bookingList);
    });
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
export class BookingList {
  constructor() {
  }
}
