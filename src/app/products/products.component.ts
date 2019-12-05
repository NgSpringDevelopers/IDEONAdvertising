import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/category.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddCartComponent} from './add-cart/add-cart.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              private dialog: MatDialog) { }

  products = [1, 2, 3, 4, 5, 6];
  categories;
  async ngOnInit() {
    this.categoryService.loadCategories().subscribe(res => {
      this.categories = res;
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

}
