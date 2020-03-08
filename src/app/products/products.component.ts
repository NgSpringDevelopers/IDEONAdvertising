import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../services/category.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddCartComponent} from './add-cart/add-cart.component';
import {ProductService} from '../services/product.service';
import * as util from '../model/util';
import {ViewImageComponent} from '../shared/view-image/view-image.component';
import {transition, trigger, useAnimation} from '@angular/animations';
import {slideFadeOut, useSlideFadeInAnimation} from '../model/animations/animations';
import {ProgressDialogComponent} from '../shared/progress-dialog/progress-dialog.component';
import {Category} from '../model/category';

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
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(private categoryService: CategoryService,
              public productService: ProductService,
              private dialog: MatDialog) { }
  categories;
  dialogRef: any;
  async ngOnInit() {
    const dialogRef = this.dialog.open(ProgressDialogComponent, util.getProgressDialogData());
    dialogRef.afterOpened().subscribe(() => {
      this.categoryService.loadCategories().subscribe(res => {
        this.categories = res;
      });
      this.productService.loadProducts().subscribe(res => {
        this.productService.products = res;
        this.productService.selectedProducts = this.productService.products;
        dialogRef.close();
        if (this.productService.selectedCategory) {
          if (this.productService.selectedCategory !== 'All') {
            const category = new Category();
            category.code = this.productService.selectedCategory;
            this.productService.selectCategory(category, this.productService.filterValue);
          }
        }
      });
    });
  }
  addCart(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '15%';
    dialogConfig.data = row;
    this.dialog.open(AddCartComponent, dialogConfig).afterClosed().subscribe(result => {
      console.log('Closed');
    });
  }

  viewImage(image) {
    this.dialogRef = this.dialog.open(ViewImageComponent, {
      width: '850px',
      height: '620px',
      data: image
    });
  }

  ngOnDestroy() {
    this.productService.selectedCategory = 'All';
    this.productService.filterValue = '';
  }
}
