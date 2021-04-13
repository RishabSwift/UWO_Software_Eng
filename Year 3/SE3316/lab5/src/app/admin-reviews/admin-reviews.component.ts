import { Component, OnInit } from '@angular/core';
import {ReviewService} from "../services/review.service";

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.scss']
})
export class AdminReviewsComponent implements OnInit {


  allReviews: any;

  constructor(public reviewService: ReviewService) { }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews = () => this.reviewService.getAllReviews().subscribe(res => {
    this.allReviews = res.map(item => {
      return {
        $id: item.payload.doc.id,
        // @ts-ignore
        ...item.payload.doc.data()
      };
    });
  });





}
