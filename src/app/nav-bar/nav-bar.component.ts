import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CategoryService} from '../services/category.service';
import {EsResponse} from '../model/es-response';
import {CartService} from '../services/cart.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ShoppingCartComponent} from '../shared/shopping-cart/shopping-cart.component';
import {LoginService} from '../services/login.service';
import {LoginComponent} from '../shared/login/login.component';
import {ProductService} from '../services/product.service';
import {Category} from '../model/category';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  selectedCategory = 'Any';
  filterValue = '';
  constructor(public router: Router,
              public cartService: CartService,
              public dialog: MatDialog,
              public productService: ProductService,
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

  userLogin() {
    const config = new MatDialogConfig();
    config.width = '50%';
    config.height = '550px';
    const dialogRef = this.dialog.open(LoginComponent, config);
  }

  onSearch() {
    this.productService.selectedCategory = this.selectedCategory;
    this.productService.filterValue = this.filterValue;
    this.router.navigateByUrl('products');
    const category = new Category();
    category.code = this.selectedCategory;
    this.productService.selectCategory(category, this.filterValue);
  }
}
