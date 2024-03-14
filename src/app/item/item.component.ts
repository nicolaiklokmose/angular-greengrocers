import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input('item') item: Item | null = null;
  @Input() itemName: string | null = null;
  @Input() itemId: string | null = null;
  @Output() addToCart: EventEmitter<void> = new EventEmitter<void>();
}
