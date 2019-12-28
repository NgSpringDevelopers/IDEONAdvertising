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
  images: FormDataEntryValue = 'assets/images/no-image.jpg';
  ngOnInit() {
    if (this.selectedImage.length > 100) {
      const blob = this.dataURItoBlob(this.selectedImage);
      const file = new File([blob], 'preview.jpg', { type: 'image/jpg' });
      this.images = file;
    } else {
      this.images = this.selectedImage;
    }
  }
  load() {
    this.images = this.selectedImage;
  }
  onClose() {
    this.dialogRef.close();
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI.substring(dataURI.indexOf('base64') + 7));
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], {type: 'image/jpeg'});
    return blob;
  }

}
