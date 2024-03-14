import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GreenGrocersService } from '../services/greengrocers.service';
import { Item } from '../models/item';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  items$ = new Observable<Item[]>();

  constructor(private readonly greenGrocersService: GreenGrocersService) {}

  ngOnInit() {
    this.items$ = this.greenGrocersService.getItems();
    this.items$.subscribe(items => {
      items.forEach(item => {
        console.log(item.name);
      });
    });
  }

  addToCart(item: Item): void {
    item.quantity = 1;
    this.greenGrocersService.addToCart(item);
  }

  /** EXTENSION FUNCTIONS */
  filterByType(type: string) {
    console.log("filter test")
    this.showAll();
    this.items$ = this.items$.pipe(
      map(items => items.filter((item: Item) => item.type === type))
    );
  }

  sortByPrice() {
    this.items$ = this.items$.pipe(
      map(items => items.sort((a, b) => a.price - b.price))
    );
  }

  sortByName() {
    this.items$ = this.items$.pipe(
      map(items => items.sort((a, b) => a.name.localeCompare(b.name)))
    );
  }
  
  showAll() {
    this.items$ = this.greenGrocersService.getItems();
  }
}
