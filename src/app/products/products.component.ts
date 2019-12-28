import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/category.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddCartComponent} from './add-cart/add-cart.component';
import {ProductService} from '../services/product.service';
import {Product} from '../model/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private dialog: MatDialog) { }
  categories;
  products;
  selectedCategory = 'all';
  selectedProducts;
  async ngOnInit() {
    this.categoryService.loadCategories().subscribe(res => {
      this.categories = res;
    });
    this.productService.loadProducts().subscribe(res => {
      this.products = res;
      this.selectedProducts = this.products;
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

}
