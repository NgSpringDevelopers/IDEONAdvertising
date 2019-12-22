import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../model/product';
import {Category} from '../../../model/category';
import {CategoryService} from '../../../services/category.service';
import {toBase64String} from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.component.html',
  styleUrls: ['./my-product.component.scss']
})
export class MyProductComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private product,
              private productService: ProductService,
              private categoryService: CategoryService,
              private dialogRef: MatDialogRef<MyProductComponent>) { }
  form: FormGroup;
  categories;
  products;
  image = 'assets/images/no-image.jpg';
  ngOnInit() {
    this.categoryService.loadCategories().subscribe(data => {
      this.categories = data;
    });
    this.productService.loadProducts().subscribe(data => {
      this.products = data;
    });
    this.form = new FormGroup ({
      code: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      categoryCode: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      image: new FormControl(''),
    });
    if (this.product) {
      this.form.get('code').setValue(this.product.code);
      this.form.get('name').setValue(this.product.name);
      this.form.get('categoryCode').setValue(this.product.categoryCode);
      this.form.get('description').setValue(this.product.description);
      this.form.get('unit').setValue(this.product.unit);
      this.form.get('quantity').setValue(this.product.quantity);
      this.form.get('price').setValue(this.product.price);
      this.form.get('image').setValue(this.product.image);
      this.image = this.product.image;
    }
  }
  onClose() {
    this.dialogRef.close();
  }

  async readImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      if (event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/png' ||
        event.target.files[0].type === 'image/jpg') {
        reader.onload = (event2) => {
          // @ts-ignore
          this.image = event2.target.result;
          this.form.get('image').setValue(this.image);
        };
      } else {
        reader.onload = (event2) => {
          this.image = 'assets/images/no-image.jpg';
        };
      }
    }
  }
  onSave() {
    if (this.form.valid) {
      if (this.product) {
        this.productService.editProduct(this.product.id, this.form.value);
        this.onClose();
      } else {
        if (!this.checkAlreadyUsedSave(this.form.get('code').value)) {
          this.productService.createProduct(this.form.value);
          this.onClose();
        } else {
          console.log('Already Used!');
        }
      }
    }
  }
  checkAlreadyUsedSave(code) {
    let isUsed = false;
    this.products.forEach(prod => {
      if (prod.code === code) {
        isUsed = true;
      }
    });
    return isUsed;
  }

}
