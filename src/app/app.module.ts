import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ProfileComponent } from './auth/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { ButtonSignOutComponent } from './components/buttons/button-sign-out/button-sign-out.component';
import { ButtonSignInComponent } from './components/buttons/button-sign-in/button-sign-in.component';
import { FormLogInComponent } from './components/forms/form-log-in/form-log-in.component';
import { FormRegisterComponent } from './components/forms/form-register/form-register.component';
import { CartComponent } from './auth/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { ProductComponent } from './components/cards/product/product.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { ProductsTableComponent } from './components/administration/products-table/products-table.component';
import { CategoriesTableComponent } from './components/administration/categories-table/categories-table.component';
import { FormProductComponent } from './components/forms/form-product/form-product.component';
import { FormCategoryComponent } from './components/forms/form-category/form-category.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    PersonalDetailsComponent,
    ProfileComponent,
    HomeComponent,
    ButtonSignOutComponent,
    ButtonSignInComponent,
    FormLogInComponent,
    FormRegisterComponent,
    CartComponent,
    ProductsComponent,
    ProductComponent,
    AdministracionComponent,
    ProductsTableComponent,
    CategoriesTableComponent,
    FormProductComponent,
    FormCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
