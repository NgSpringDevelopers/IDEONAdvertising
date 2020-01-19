import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Cart} from '../../model/cart';
import {Product} from '../../model/product';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.scss']
})
export class AddCartComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddCartComponent>,
              public cartService: CartService,
              @Inject(MAT_DIALOG_DATA) private data) { }
  product;
  form: FormGroup;
  ngOnInit() {
    if (this.data) {
      this.product = this.data;
    }
    this.form = new FormGroup({
      amount: new FormControl(1, Validators.required)
    });
  }
  onClose() {
    this.dialogRef.close();
  }
  plus() {
    const val = this.form.get('amount').value + 1;
    this.form.get('amount').setValue(val);
  }
  minus() {
    const val = this.form.get('amount').value - 1;
    if (val > 0) {
      this.form.get('amount').setValue(val);
    }
  }
  addToCart() {
    if (this.product && this.form.valid) {
      const cart = new Cart(this.product.code, this.form.get('amount').value);
      this.cartService.cart.push(cart);
      this.onClose();
    }
  }

}
