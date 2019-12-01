import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  products = [1, 2, 3, 4, 5, 6];
  categories;
  async ngOnInit() {
    this.categoryService.loadCategories().subscribe(res => {
      this.categories = res;
    });
  }

}
