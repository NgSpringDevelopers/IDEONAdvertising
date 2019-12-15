import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { CategoryService } from 'src/app/services/category.service';
import { MyCategoryComponent } from './my-category/my-category.component';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'code', 'name','action'];
  dataSource = new MatTableDataSource<CategoryTable>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private categoryService: CategoryService,
              private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.categoryService.loadCategories().subscribe(data => {
      this.dataSource.data = data;
    });
  }
  onEdit(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.data = row;
    this.dialog.open(MyCategoryComponent, dialogConfig);
  }

  onDelete() {}

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(MyCategoryComponent, dialogConfig);
  }

}

export interface CategoryTable {
  id: string;
  code: string;
  name: string;
  action: any;
}