import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
    providedIn: 'root'
})

export class GreenGrocersService {
    http = inject(HttpClient);
    
    total = 0;
    cartItems: Item[] = [];

    getItems(): Observable<Item[]> {
        return this.http.get<Item[]>("https://boolean-api-server.fly.dev/groceries");
    }

    getCartItems(): Item[] {
        return this.cartItems;
    }

    getTotal(): number {
        return this.total;
      }

    setTotal(total: number): void {
        this.total = total;
    }
}