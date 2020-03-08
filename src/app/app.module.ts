import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule,
  MatSelectModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatTableModule, MatSnackBarModule, MatGridListModule, MatRadioModule, MatBadgeModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AboutComponent } from './about/about.component';
import {HttpClientModule} from '@angular/common/http';
import { environment } from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import { ProductsComponent } from './products/products.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import { AddCartComponent } from './products/add-cart/add-cart.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { MyCategoryComponent } from './admin/add-category/my-category/my-category.component';
import { ConfirmComponent } from './services/confirm/confirm.component';
import { MyProductComponent } from './admin/add-product/my-product/my-product.component';
import { ViewImageComponent } from './shared/view-image/view-image.component';
import {NgImageViewerModule} from '@haseeamarathunga/ng-image-viewer';
import { ProgressDialogComponent } from './shared/progress-dialog/progress-dialog.component';
import { ShoppingCartComponent } from './shared/shopping-cart/shopping-cart.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    AboutComponent,
    ProductsComponent,
    AddCartComponent,
    AddCategoryComponent,
    AddProductComponent,
    MyCategoryComponent,
    ConfirmComponent,
    MyProductComponent,
    ViewImageComponent,
    ProgressDialogComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    NgxSpinnerModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MatGridListModule,
    MatRadioModule,
    MatBadgeModule,
    NgImageViewerModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddCartComponent, MyCategoryComponent, ConfirmComponent, MyProductComponent, ViewImageComponent,
    ProgressDialogComponent, ShoppingCartComponent]
})
export class AppModule { }
