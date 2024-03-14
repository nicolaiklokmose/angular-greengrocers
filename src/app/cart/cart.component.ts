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
    this.cartItems$ = this.greenGrocersService.getCartItems();
  }
}