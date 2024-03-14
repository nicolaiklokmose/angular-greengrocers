import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GreenGrocersService } from '../services/greengrocers.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems$ = new Observable<Item[]>();
  
  constructor(private readonly greenGrocersService: GreenGrocersService) {}

  ngOnInit() {
    this.cartItems$ = this.greenGrocersService.getItems();
    this.cartItems$.subscribe((items) => {
      const total = this.getTotal(items);
      console.log("inside cart component", total);
      this.greenGrocersService.setTotal(total);
      console.log("this total is from the service: ", this.greenGrocersService.total$)
    });
  }

  getTotal(items: Item[]): number {
    let total = 0;
    items.forEach(item => {
      total += item.price;
    });
    return total;
  }
}