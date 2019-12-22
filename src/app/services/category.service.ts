import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Category} from '../model/category';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public fireStore: AngularFirestore) { }
  loadCategories() {
    return this.fireStore.collection('categories').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
  }
  createCategory(category: Category) {
    return new Promise<Category> ((resolve, reject) => {
      this.fireStore.collection('categories').add(category).then(res => {}, err => reject(err));
    });
  }

  editCategory(id, category: Category) {
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
