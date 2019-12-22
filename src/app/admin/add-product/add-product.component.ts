import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource} from '@angular/material';
import {ProductService} from '../../services/product.service';
import {MyCategoryComponent} from '../add-category/my-category/my-category.component';
import {MyProductComponent} from './my-product/my-product.component';
import {DialogService} from '../../services/dialog.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  displayedColumns: string[] = ['id', 'code', 'name', 'categoryCode', 'description', 'unit', 'quantity', 'price', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(public productService: ProductService,
              private dialog: MatDialog,
              private dialogService: DialogService,
              private notificationService: NotificationService,
              ) { }

  ngOnInit() {
    this.productService.loadProducts().subscribe(data => {
      this.dataSource.data = data;
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
}
