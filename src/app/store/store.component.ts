import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GreenGrocersService } from '../services/greengrocers.service';
import { Item } from '../models/item';

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
}
