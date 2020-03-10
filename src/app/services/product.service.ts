import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Product} from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public fireStore: AngularFirestore) { }
  selectedCategory = 'All';
  filterValue = '';
  products;
  selectedProducts;
  loadProducts() {
    return this.fireStore.collection('products').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
  }
  createProduct(product: Product) {
    return new Promise<Product> ((resolve, reject) => {
      this.fireStore.collection('products').add(product).then(res => {}, err => reject(err));
    });
  }

  editProduct(id, product: Product) {
    this.fireStore.doc('products/' + id).update(product);
  }
  deleteProduct(id) {
    this.fireStore.doc('products/' + id).delete();
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  selectCategory(category, filter) {
    if (category.code !== 'All') {
      this.selectedCategory = category.code;
      this.selectedProducts = this.filterProductsByCatCode(this.selectedCategory, filter);
    } else {
      this.selectedCategory = 'All';
      this.selectedProducts = this.products;
    }
  }
  filterProductsByCatCode(catCode, filter) {
    const productArr = [];
    this.products.forEach(product => {
      if (product.categoryCode === catCode) {
        if (filter) {
          if (filter.toLowerCase() === product.name.toLowerCase()) {
            productArr.push(product);
          }
        } else {
          productArr.push(product);
        }
      }
    });
    return productArr;
  }

  getLengthFromCatCode(code) {
    if (this.products) {
      let i = 0;
      this.products.forEach(product => {
        if (product.categoryCode === code) {
          i++;
        }
      });
      return i;
    }
  }
}
