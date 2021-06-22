import {Component, Inject, OnInit} from '@angular/core';


import {HouseService} from '../../service/house/house.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {House} from '../../model/house';
import {BookingServiceService} from '../../service/booking/bookingservice.service';
import {ReviewService} from '../../service/review/review.service';
import {Review} from '../../model/review';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../../environments/environment';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/authentication.service';
import {SocketService} from '../../service/socket/socket.service';

import {UserServiceService} from '../../service/user-service.service';
import {DateServiceService} from '../../service/date/date-service.service';
import {NotifyServiceService} from '../../service/notify/notify-service.service';
import {DOCUMENT} from '@angular/common';


const API_URL = `${environment.api_url}`;
declare var $: any;

@Component({
  selector: 'app-detail-house',
  templateUrl: './detail-house.component.html',
  styleUrls: ['./detail-house.component.css']
})
export class DetailHouseComponent implements OnInit {
  stompClient: any;
  allowToReview: boolean = false;
  houseId?: any;
  house: House;
  images: string[] = [];
  reviewList: Review[] = [];
  countReview: number;
  oneStar: number = 0;
  twoStar: number = 0;
  threeStar: number = 0;
  fourStar: number = 0;
  fiveStar: number = 0;
  totalRate: string;
  review: Review;
  currentUser: UserToken = {};
  public style: 'width:500px;height:600px;';


  constructor(private houseService: HouseService,
              private bookingService: BookingServiceService,
              private reviewService: ReviewService,
              @Inject(DOCUMENT) private document : Document,
              private socketService: SocketService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private userService: UserServiceService,
              private dateService: DateServiceService,
              private notifyService: NotifyServiceService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.houseId = paramMap.get('houseId');
      this.bookingService.currentId = this.houseId;
      this.createNewReview();
    });
    this.authenticationService.currentUser.subscribe(value => {
      this.currentUser = value;
    });

  }

  async getHouse(houseId: number) {
    await this.houseService.findByHouseId(houseId).toPromise().then((house) => {
      console.log('Function  lay ra list house');
      this.houseService.currentHouse = house;
      this.house = house;
      this.images = house.imagesList;
    });
  }

  async ngOnInit() {
    this.checkAllowToReview();
    await this.getHouse(this.houseId).then(() => {
      console.log('Sau Khi lay ra house');

      //Load slide
      $(function() {
        $('#image-gallery').lightSlider({
          gallery: true,
          item: 1,
          thumbItem: 9,
          slideMargin: 0,
          speed: 1000,
          auto: true,
          loop: true,
          onSliderLoad: function() {
            $('#image-gallery').removeClass('cS-hidden');
          }
        });
      });
    });
    await this.getReviews();
    this.connect();


    $(document).ready(function() {

      /* 1. Visualizing things on Hover - See next part for action on click */
      $('#stars li').on('mouseover', function() {
        var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

        // Now highlight all the stars that's not after the current hovered star
        $(this).parent().children('li.star').each(function(e) {
          if (e < onStar) {
            $(this).addClass('hover');
          } else {
            $(this).removeClass('hover');
          }
        });

      }).on('mouseout', function() {
        $(this).parent().children('li.star').each(function(e) {
          $(this).removeClass('hover');
        });
      });


      /* 2. Action to perform on click */
      $('#stars li').on('click', function() {
        var onStar = parseInt($(this).data('value'), 10); // The star currently selected
        var stars = $(this).parent().children('li.star');

        for (let i = 0; i < stars.length; i++) {
          $(stars[i]).removeClass('selected');
        }

        for (let i = 0; i < onStar; i++) {
          $(stars[i]).addClass('selected');
        }

        // JUST RESPONSE (Not needed)
        var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
        var msg = '';
        if (ratingValue > 1) {
          msg = 'Thanks! You rated this ' + ratingValue + ' stars.';
        } else {
          msg = 'We will improve ourselves. You rated this ' + ratingValue + ' stars.';
        }
        responseMessage(msg);

      });

      $(function() {

        $('#image-gallery').lightSlider({
          gallery: true,
          item: 1,
          thumbItem: 9,
          slideMargin: 0,
          speed: 1000,
          auto: true,
          loop: true,
          onSliderLoad: function() {
            $('#image-gallery').removeClass('cS-hidden');
          }
        });
      });
    });

    function responseMessage(msg) {
      $('.success-box').fadeIn(200);
      $('.success-box div.text-message').html('<span>' + msg + '</span>');
    }

  }

  getReviews() {
    return this.reviewService.getAllReview(this.houseId).subscribe(listReview => {
      for (let i = 0; i < listReview.length; i++) {
        // @ts-ignore
        listReview[i].postDate = this.dateService.formatDateTime(listReview[i].postDate);
      }
      this.reviewList = listReview;
      this.countReview = listReview.length;
      for (let review of this.reviewList) {
        if (review.rating == 1) {
          this.oneStar++;
        }
        if (review.rating == 2) {
          this.twoStar++;
        }
        if (review.rating == 3) {
          this.threeStar++;
        }
        if (review.rating == 4) {
          this.fourStar++;
        }
        if (review.rating == 5) {
          this.fiveStar++;
        }
      }
      this.totalRate = ((this.oneStar + this.twoStar * 2 + this.threeStar * 3 + this.fiveStar * 5 + this.fourStar * 4) / listReview.length).toFixed(1);
    });
  }

  async createNewReview() {

    let rating = parseInt($('#stars li.selected').last().data('value'), 10);
    const review: Review = {
      rating: rating,
      comment: $('.textarea').val(),
      house: {
        houseId: this.houseId
      },
      user: {
        userId: this.currentUser.id
      }
    };
    this.createReviewUsingSocket(review);
    await this.checkAllowToReview();

    // save current route first
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
    });

  }

  connect() {
    const ws = new SockJS(`${API_URL}/ws`);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe('/topic/houses', data => {
        const jsonData = JSON.parse(data.body);
        this.reviewList.push(jsonData);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }

  createReviewUsingSocket(review) {
    this.stompClient.send('/app/houses', {}, JSON.stringify(review));
  }

  checkAllowToReview() {
    if (this.userService.getCurrentUser() != null) {
      this.userService.checkRightForReview(this.userService.getCurrentUser().id, this.bookingService.currentId).subscribe(
        result => {
          if (result == 0) {
            return this.allowToReview = false;
          }
          return this.allowToReview = true;
        }
      );
    }
  }

}
