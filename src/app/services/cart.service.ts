import { Injectable } from '@angular/core';
import {Cart} from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  public cart: Cart[] = [];
}
