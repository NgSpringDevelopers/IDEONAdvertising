import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public selectedImage: any,
              private dialogRef: MatDialogRef<ViewImageComponent>
  ) {
  }
  images = 'assets/images/no-image.jpg';
  ngOnInit() {
    if (this.selectedImage) {
      this.images = this.selectedImage;
    }
  }
  load() {
    this.images = this.selectedImage;
  }
  onClose() {
    this.dialogRef.close();
  }
}
