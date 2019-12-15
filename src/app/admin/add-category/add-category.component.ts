import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'code', 'name','action'];
  dataSource = new MatTableDataSource<CategoryTable>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.loadCategories().subscribe(data => {
      this.dataSource.data = data;
    });
  }

}

export interface CategoryTable {
  id: string;
  code: string;
  name: string;
  action: any;
}