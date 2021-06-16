import {Component, DoCheck, OnInit} from '@angular/core';
import * as moment from 'moment';
import {BookingServiceService} from '../../service/booking/bookingservice.service';
import {Booking} from '../../model/booking';
import {NotifyServiceService} from '../../service/notify/notify-service.service';
import {MatDialogRef} from '@angular/material/dialog';
import {GeneralPopupComponent} from '../../general-popup/general-popup.component';

@Component({
  selector: 'booking-active',
  templateUrl: './bookingActive.component.html',
  styleUrls: ['./bookingActive.component.css']
})
export class BookingActiveComponent implements OnInit, DoCheck {

  listDisableDate = [];
  checkInDate: any;
  checkOutDate: any;
  today: any = Date.now();
  minDate: Date;
  maxDate: Date;

  constructor(private bookingService: BookingServiceService, private notifyService: NotifyServiceService) {
  }

  ngOnInit() {
    this.getAllBookingByHouseId(this.bookingService.currentId);
  }

  dateFilter = (d: Date) => {
    if (d < this.today) {
      return false;
    }
    let formattedDate = this.formatDate(d);
    return this.listDisableDate.indexOf(formattedDate) == -1;
  };


  getAllBookingByHouseId(id: any) {
    this.bookingService.getBookingByHouseId(id).subscribe((data) => {
      this.getListDisableDate(data);
    });
  }

  getListDisableDate(data: any) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      let start = new Date(data[i].checkinDate);
      let end = new Date(data[i].checkoutDate);
      console.log(start, end);
      this.setListDisableDate(start, end);
    }
  }

  setListDisableDate(start: any, end: any): any {
    while (start <= end) {
      this.listDisableDate.push(this.formatDate(start));
      start = this.getNextDay(start);
    }
    return this.listDisableDate;
  }

  getNextDay(day: any): any {
    let nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    return nextDay;
  }

  formatDate(date: any): any {
    return (moment(date)).format('yyyy-MM-DD');
  }

  doBooking(data: any) {
    if (data == true) {
      let start = this.formatDate(this.checkInDate);
      let end = this.formatDate(this.checkOutDate);
      let totalDay = (this.checkOutDate.getTime() - this.checkInDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
      let booking: Booking = {
        bookingStatus: -1,
        checkinDate: start,
        checkoutDate: end,
        total: totalDay,
        houseId: 1,
        userId: JSON.parse(window.localStorage.getItem('currentUser')).id
      };
      console.log(booking);
      this.bookingService.doBooking(booking).subscribe(() => {
        this.notifyService.notify = 'success';
        alert('Booking Success');
        window.location.reload();
      });
    }
  }

  validateForCheckoutDate() {
    this.minDate = this.checkInDate;

    //Kiểm tra ngày sau ngày checkin xem có bị khóa không
    //Để tránh trường hợp chọn ngày bị ngắt quãng

    let start = this.checkInDate;
    if (this.listDisableDate.length != 0) {
      while (true) {
        let theDayAfterCheckInDay = this.formatDate(this.getNextDay(start));
        if (this.listDisableDate.indexOf(theDayAfterCheckInDay) != -1) {
          this.maxDate = start;
          break;
        }
        start = this.getNextDay(start);
      }
    }

  }

  ngDoCheck() {
    if (this.formatDate(this.checkInDate) == this.formatDate(this.today)) {
      this.notifyService.notify = 'inValidInStartDate';
    } else if (this.formatDate(this.checkOutDate) == this.formatDate(this.today)) {
      this.notifyService.notify = 'inValidInEndDate';
    } else {
      this.notifyService.notify = 'valid';
    }
  }
}
