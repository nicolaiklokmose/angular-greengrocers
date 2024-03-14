import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
    providedIn: 'root'
})

export class GreenGrocersService {
    http = inject(HttpClient);
    
    total$ = 0;
    cartItems$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);

    getItems(): Observable<Item[]> {
        return this.http.get<Item[]>("https://boolean-api-server.fly.dev/groceries");
    }

    getCartItems(): Observable<Item[]> {
        return this.cartItems$.asObservable();
    }

    setTotal(total: number): void {
        this.total$ = total;
    }

    addToCart(item: Item) {
        const currentItems = this.cartItems$.value;
        currentItems.push(item);
        this.cartItems$.next(currentItems);
        console.log("Item added to cart:", item);
    }
}