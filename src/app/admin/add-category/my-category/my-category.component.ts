import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-my-category',
  templateUrl: './my-category.component.html',
  styleUrls: ['./my-category.component.scss']
})
export class MyCategoryComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private category,
              private categoryService: CategoryService,
              private dialogRef: MatDialogRef<MyCategoryComponent>) { }
  form: FormGroup;
  categories;
  ngOnInit() {
    this.form = new FormGroup ({
      code: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required)
    });
    if (this.category) {
      this.form.get('code').setValue(this.category.code);
      this.form.get('name').setValue(this.category.name);
    }
    this.categoryService.loadCategories().subscribe(data => {
      this.categories = data;
    });
  }
  onClose() {
    this.dialogRef.close();
  }
  onSave() {
    if (this.form.valid) {
      if (this.category) {
        this.categoryService.editCategory(this.category.id, this.form.value);
        this.onClose();
      } else {
        if (!this.checkAlreadyUsedSave(this.form.get('code').value)) {
          this.categoryService.createCategory(this.form.value);
          this.onClose();
        } else {
          console.log('Already Used!');
        }
      }
    }
  }
  onDelete() {
  }
  checkAlreadyUsedSave(code) {
    let isUsed = false;
    this.categories.forEach(cat => {
      if (cat.code === code) {
        isUsed = true;
      }
    });
    return isUsed;
  }

}
