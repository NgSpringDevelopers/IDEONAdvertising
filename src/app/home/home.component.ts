import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  products = [1, 2, 3, 4, 5, 6];
  async ngOnInit() {
    this.categoryService.loadCategories().subscribe();
  }

}
