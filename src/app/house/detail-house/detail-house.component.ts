import {Component, OnInit} from '@angular/core';


import {HouseService} from '../../service/house/house.service';
import {ActivatedRoute, ParamMap, Route, Router} from '@angular/router';
import {House} from '../../model/house';
import {BookingServiceService} from '../../service/booking/bookingservice.service';
import {ReviewService} from '../../service/review/review.service';
import {Review} from '../../model/review';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// import {SocketService} from '../../service/socket/socket.service';


declare var $: any;
@Component({
  selector: 'app-detail-house',
  templateUrl: './detail-house.component.html',
  styleUrls: ['./detail-house.component.css']
})
export class DetailHouseComponent implements OnInit {

  houseId?: any;
  house: House;
  images: string[] = [];
  reviewList: Review[]=[];
  countReview:number;
  oneStar :number =0;
  twoStar :number =0;
  threeStar :number =0;
  fourStar :number =0;
  fiveStar :number =0;
  totalRate: string;
  review: Review;
  public style: 'width:500px;height:600px;';
  reviewForm: FormGroup = new FormGroup({
    rating: new FormControl('',Validators.required),
    comment: new FormControl('')
  });

  constructor(private houseService: HouseService,
              private bookingService: BookingServiceService,
              private reviewService: ReviewService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.houseId = paramMap.get('houseId');
      this.getHouse(+this.houseId);
      this.bookingService.currentId = this.houseId;
    });
  }

  getHouse(houseId: number) {
    return this.houseService.findByHouseId(houseId).subscribe(house => {
      this.houseService.currentHouse = house;
      this.house = house;
      this.images = house.imagesList;
    });
  }

  ngOnInit() {
    this.getReviews();
    // this.socketService.connect(this.houseId);
    $(document).ready(function(){

      /* 1. Visualizing things on Hover - See next part for action on click */
      $('#stars li').on('mouseover', function(){
        var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

        // Now highlight all the stars that's not after the current hovered star
        $(this).parent().children('li.star').each(function(e){
          if (e < onStar) {
            $(this).addClass('hover');
          }
          else {
            $(this).removeClass('hover');
          }
        });

      }).on('mouseout', function(){
        $(this).parent().children('li.star').each(function(e){
          $(this).removeClass('hover');
        });
      });


      /* 2. Action to perform on click */
      $('#stars li').on('click', function(){
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
        var msg = "";
        if (ratingValue > 1) {
          msg = "Thanks! You rated this " + ratingValue + " stars.";
        }
        else {
          msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
        }
        responseMessage(msg);

      });

      $(function () {

        $('#image-gallery').lightSlider({
          gallery: true,
          item: 1,
          thumbItem: 9,
          slideMargin: 0,
          speed: 1000,
          auto: true,
          loop: true,
          onSliderLoad: function () {
            $('#image-gallery').removeClass('cS-hidden');
          }
        });
      });
    });
    $(document).ready(function() {
      $('.bar span').hide();
      $('#bar-five').animate({
        width: '75px'});
      $('#bar-four').animate({
        width: '35px'});
      $('#bar-three').animate({
        width: '20px'});
      $('#bar-two').animate({
        width: '15px'});
      $('#bar-one').animate({
        width: '30px'});

      setTimeout(function() {
        $('.bar span').fadeIn('slow');
      }, 1000);

    });


    function responseMessage(msg) {
      $('.success-box').fadeIn(200);
      $('.success-box div.text-message').html("<span>" + msg + "</span>");
    }


  }


  private getReviews() {
    this.reviewService.getAllReview(this.houseId).subscribe(listReview =>{
      this.reviewList = listReview;
      this.countReview = listReview.length
      for(this.review of this.reviewList){
        if(this.review.rating ==1){
          this.oneStar +=1;
        }if(this.review.rating ==2){
          this.twoStar +=1;
        }
        if(this.review.rating ==3){
          this.threeStar +=1;
        }
        if(this.review.rating ==4){
          this.fourStar +=1;
        }
        if(this.review.rating ==5){
          this.fiveStar +=1;
        }
      }
      this.totalRate =((this.oneStar*1 + this.twoStar*2 +this.threeStar*3 +this.fiveStar*5 + this.fourStar*4)/this.countReview).toFixed(1)
    })
  }
  createNewReview(){
    var value = parseInt($('#stars li.selected').last().data('value'), 10);
    const review : Review  = {
      rating: value,
      comment: this.reviewForm.value.comment,
    };
    this.reviewService.createReview(this.houseId,review).subscribe();
}



}
