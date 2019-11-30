import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EsResponse} from '../model/es-response';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories = [];
  constructor(public http: HttpClient) { }
  baseUrl = 'http://localhost:8080/category/v1';
  loadCategories() {
    return this.http.get(this.baseUrl).pipe(map((res: EsResponse) => {
      this.categories = res.body;
      return res;
    }));
  }
  get _categories() {
    return this.categories;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
