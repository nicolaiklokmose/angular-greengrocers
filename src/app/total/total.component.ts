import { Component, OnInit } from '@angular/core';
import { GreenGrocersService } from '../services/greengrocers.service';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent implements OnInit {
  total: Number = 0;

  constructor(private readonly greenGrocersService: GreenGrocersService) {}

  ngOnInit() {
    this.total = this.greenGrocersService.total$;
    console.log("Inside total component: ", this.total)
  }
}
