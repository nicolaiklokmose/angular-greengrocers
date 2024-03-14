import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GreenGrocersService } from '../services/greengrocers.service';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent implements OnInit {
  @Input() total: number = 0;
  private totalSubscription: Subscription | undefined;

  constructor(private readonly greenGrocersService: GreenGrocersService) {}

  ngOnInit() {
    this.totalSubscription = this.greenGrocersService.total$.subscribe(total => {
      this.total = total;
      console.log("Inside total component: ", this.total);
    });
  }
}
