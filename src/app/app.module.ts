import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {
  MatButtonModule,
  MatCardModule, MatDialog, MatDialogModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule,
  MatSelectModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatTableModule, MatSnackBarModule, MatGridListModule, MatRadioModule
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
import {IMAGEVIEWER_CONFIG, ImageViewerModule} from '@hallysonh/ngx-imageviewer';
import {IMAGE_VIEWER_CONFIG_DEFAULT} from './model/ImageViewer';
import { ViewImageComponent } from './shared/view-image/view-image.component';
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
    ViewImageComponent
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
    ImageViewerModule
  ],
  providers: [
    {
      provide: IMAGEVIEWER_CONFIG,
      useValue: IMAGE_VIEWER_CONFIG_DEFAULT
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddCartComponent, MyCategoryComponent, ConfirmComponent, MyProductComponent, ViewImageComponent]
})
export class AppModule { }
