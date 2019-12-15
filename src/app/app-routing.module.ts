import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AboutComponent} from './about/about.component';
import {ProductsComponent} from './products/products.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { AddProductComponent } from './admin/add-product/add-product.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'add-category', component: AddCategoryComponent},
  {path: 'add-product', component: AddProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
