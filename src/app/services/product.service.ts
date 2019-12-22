import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Product} from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public fireStore: AngularFirestore) { }

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
}
