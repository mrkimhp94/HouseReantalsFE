import {Injectable} from '@angular/core';
import {BookingServiceService} from '../booking/bookingservice.service';
import {NotifyServiceService} from '../notify/notify-service.service';
import {UserServiceService} from '../user-service.service';
import {HouseService} from '../house/house.service';
import * as moment from 'moment';
import {Booking} from '../../model/booking';

@Injectable({
  providedIn: 'root'
})
//e viết date này cho đỡ lặp code => checkDateBooking,checkDate để cấp quyền hay đổi house_status
//có hàm so sánh date , formatdate ,tính ngày tiếp theo vv  dùng ở nhiều nơi khác nữa
//vv... mục đích tái sử dụng code
export class DateServiceService {
  allBookingDate = [];
  checkInDate: any;
  checkOutDate: any;
  today: any = Date.now();
  minDate: Date;
  maxDate: Date;


  constructor(private bookingService: BookingServiceService,
              private houseService: HouseService) {
  }
  dateFilter = (d: Date) => {
    if (d < this.today) {
      return false;
    }
    let formattedDate = this.formatDate(d);
    return this.allBookingDate.indexOf(formattedDate) == -1;
  };

  async setHouseId(id: any) {
   await this.bookingService.getBookingByHouseId(id).subscribe((data) => {
      this.getListDisableDate(data);
    });
  }

  getListDisableDate(data: any) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      let start = new Date(data[i].checkinDate);
      let end = new Date(data[i].checkoutDate);
      this.setListDisableDate(start, end);
    }
  }

  setListDisableDate(start: any, end: any): any {
    while (start <= end) {
      this.allBookingDate.push(this.formatDate(start));
      start = this.getNextDay(start);
    }
    return this.allBookingDate;
  }

  getNextDay(day: any): any {
    let nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    return nextDay;
  }

  formatDate(date: any): any {
    return (moment(date)).format('yyyy-MM-DD');
  }


  checkTotalMoney(start: any, end: any): number {
    let totalDays = 0;
    let total;
    let pricesPerDay = this.houseService.getCurrentHouse().pricePerDay;
    while (start <= end) {
      totalDays++;
      start = this.getNextDay(start);
    }
    total = totalDays * pricesPerDay;
    return total;
  }

  getAllBookingDate() {
    return this.allBookingDate;
  }
}
