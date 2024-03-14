import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
    providedIn: 'root'
})

export class GreenGrocersService {
    http = inject(HttpClient);
    
    total$ = new BehaviorSubject<number>(0);
    cartItems$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);

    getItems(): Observable<Item[]> {
        return this.http.get<Item[]>("https://boolean-api-server.fly.dev/groceries");
    }

    getCartItems(): Observable<Item[]> {
        return this.cartItems$.asObservable();
    }

    private calculateTotal(cartItems: Item[]): number {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    setTotal(total: number): void {
        this.total$.next(total);
    }

    updateTotal(): void {
        const currentItems = this.cartItems$.value;
        const total = this.calculateTotal(currentItems);
        this.setTotal(total);
    }

    addToCart(item: Item) {
        const currentItems = this.cartItems$.value;
        const existingItem = currentItems.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity++;
            this.cartItems$.next([...currentItems]);
        } else {
            this.cartItems$.next([...currentItems, { ...item, quantity: 1 }]);
        }
        this.updateTotal(); 
    }

    removeItemFromCart(item: Item) {
        const currentItems = this.cartItems$.value;
        const updatedItems = currentItems.map(cartItem => {
            if (cartItem.id === item.id) {
                if (cartItem.quantity > 1) {
                    cartItem.quantity--;
                } else {
                    return null;
                }
            }
            return cartItem;
        }).filter(Boolean) as Item[];
        this.cartItems$.next(updatedItems);
        this.updateTotal();
    }
}
