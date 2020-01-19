import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CategoryService} from '../services/category.service';
import {EsResponse} from '../model/es-response';
import {CartService} from '../services/cart.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ShoppingCartComponent} from '../shared/shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public router: Router,
              public cartService: CartService,
              public dialog: MatDialog,
              private categoryService: CategoryService) { }
  categories;
  async ngOnInit() {
    this.categoryService.loadCategories().subscribe(res => {
      this.categories = res;
    });
  }
  gotoAbout() {
    return this.router.navigateByUrl('about');
  }
  shoppingCart() {
    const config = new MatDialogConfig();
    config.width = '50%';
    config.height = '550px';
    const dialogRef = this.dialog.open(ShoppingCartComponent, config);
  }

}
