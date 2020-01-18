import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/category.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddCartComponent} from './add-cart/add-cart.component';
import {ProductService} from '../services/product.service';
import * as util from '../model/util';
import {ViewImageComponent} from '../shared/view-image/view-image.component';
import {transition, trigger, useAnimation} from '@angular/animations';
import {slideFadeOut, useSlideFadeInAnimation} from '../model/animations/animations';
import {ProgressDialogComponent} from '../shared/progress-dialog/progress-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('simple', [
      transition(':enter', useSlideFadeInAnimation('1s', '20px')),
      transition(':leave', useAnimation(slideFadeOut, {params: {time: '1s', endPos: '100px'}})),
    ]),
  ]
})
export class ProductsComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private dialog: MatDialog) { }
  categories;
  products;
  selectedCategory = 'all';
  selectedProducts;
  dialogRef: any;
  async ngOnInit() {
    const dialogRef = this.dialog.open(ProgressDialogComponent, util.getProgressDialogData());
    dialogRef.afterOpened().subscribe(() => {
      this.categoryService.loadCategories().subscribe(res => {
        this.categories = res;
      });
      this.productService.loadProducts().subscribe(res => {
        this.products = res;
        this.selectedProducts = this.products;
        dialogRef.close();
      });
    });
  }
  addCart(row) {
    console.log(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(AddCartComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('Closed');
    });
  }
  selectCategory(category) {
    if (category) {
      this.selectedCategory = category.code;
      this.selectedProducts = this.filterProductsByCatCode(this.selectedCategory);
    } else {
      this.selectedCategory = 'all';
      this.selectedProducts = this.products;
    }
  }
  filterProductsByCatCode(catCode) {
    const productArr = [];
    this.products.forEach(product => {
      if (product.categoryCode === catCode) {
        productArr.push(product);
      }
    });
    return productArr;
  }
  getLengthFromCatCode(code) {
    if (this.products) {
      let i = 0;
      this.products.forEach(product => {
        if (product.categoryCode === code) {
          i++;
        }
      });
      return i;
    }
  }

  viewImage(image) {
    this.dialogRef = this.dialog.open(ViewImageComponent, {
      width: '850px',
      height: '620px',
      data: image
    });
  }
}
