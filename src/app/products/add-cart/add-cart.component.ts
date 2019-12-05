import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.scss']
})
export class AddCartComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddCartComponent>) { }

  ngOnInit() {
  }
  onClose() {
    this.dialogRef.close();
  }

}
