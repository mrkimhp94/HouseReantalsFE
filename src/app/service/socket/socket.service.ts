import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {stringify} from '@angular/compiler/src/util';
import {Review} from '../../model/review';
import {ReviewService} from '../review/review.service';

const API_URL = `${environment.api_url}`;

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  stompClient: any;
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService) {

  }



  connect(houseId:number) {
    const ws = new SockJS(`${API_URL}/ws`);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe('/topic/reviews', data => {
        const jsonData = JSON.parse(data.body);
        this.reviews.push(jsonData);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }

  createReviewUsingSocket(houseId:number,review) {
    this.stompClient.send(`/app/reviews`, {}, JSON.stringify(review));
  }
}
