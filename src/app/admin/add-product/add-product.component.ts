import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource} from '@angular/material';
import {ProductService} from '../../services/product.service';
import {MyCategoryComponent} from '../add-category/my-category/my-category.component';
import {MyProductComponent} from './my-product/my-product.component';
import {DialogService} from '../../services/dialog.service';
import {NotificationService} from '../../services/notification.service';
import {ProgressDialogComponent} from '../../shared/progress-dialog/progress-dialog.component';
import * as util from '../../model/util';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  displayedColumns: string[] = ['code', 'name', 'categoryCode', 'description', 'unit', 'quantity', 'price', 'action'];
  dataSource = new MatTableDataSource<any>();
  searchKey: string;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(public productService: ProductService,
              private dialog: MatDialog,
              private dialogService: DialogService,
              private notificationService: NotificationService,
              ) { }

  ngOnInit() {
    const dialogRef = this.dialog.open(ProgressDialogComponent, util.getProgressDialogData());
    dialogRef.afterOpened().subscribe(() => {
      this.productService.loadProducts().subscribe(data => {
        this.dataSource.data = data;
        dialogRef.close();
      });
    });
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(MyProductComponent, dialogConfig);
  }

  onEdit(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = row;
    this.dialog.open(MyProductComponent, dialogConfig);
  }
  onDelete(id) {
    this.dialogService.openConfirmDialog('Are you sure to delete ?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.productService.deleteProduct(id);
        this.notificationService.warn('Successfully Deleted!');
      }
      this.ngOnInit();
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
}
