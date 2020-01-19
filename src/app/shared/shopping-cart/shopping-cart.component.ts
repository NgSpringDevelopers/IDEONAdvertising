import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {ProductService} from '../../services/product.service';
import {MatDialog} from '@angular/material';
import {ProgressDialogComponent} from '../progress-dialog/progress-dialog.component';
import * as util from '../../model/util';
import {DialogService} from '../../services/dialog.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(public service: CartService,
              private productService: ProductService,
              private dialogService: DialogService,
              private notificationService: NotificationService,
              private dialog: MatDialog,
              ) { }
  products;
  cartItems;
  cartDetails = [];
  totalAmt = 0;
  ngOnInit() {
    this.cartDetails = [];
    this.totalAmt = 0;
    this.cartItems = this.service.cart;
    const dialogRef = this.dialog.open(ProgressDialogComponent, util.getProgressDialogData());
    dialogRef.afterOpened().subscribe(() => {
      this.productService.loadProducts().subscribe(res => {
        this.products = res;
        this.cartItems.forEach(item => {
          const prod = this.getProductFromCode(this.products, item.productCode);
          this.totalAmt = this.totalAmt + (prod.price * item.quantity);
          const detail = {
            product: prod,
            quantity: item.quantity
          };
          this.cartDetails.push(detail);
        });
        dialogRef.close();
      });
    });
  }

  getProductFromCode(products, code) {
    let pro = null;
    products.forEach(product => {
      if (product.code === code) {
        pro = product;
      }
    });
    return pro;
  }

  async deleteItem(item) {
    this.dialogService.openConfirmDialog('Are you sure to delete ?')
      .afterClosed().subscribe(async res => {
      if (res) {
        const cartItem = [];
        this.service.cart.forEach(cart => {
          if (cart.productCode !== item.product.code) {
            cartItem.push(cart);
          }
        });
        this.service.cart = cartItem;
        await this.delay(500);
        this.ngOnInit();
        this.notificationService.warn('Successfully Deleted!');
      }
    });
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
