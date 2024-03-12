import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { FormCategoryComponent } from './components/forms/form-category/form-category.component';
import { FormProductComponent } from './components/forms/form-product/form-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'productos', component: ProductsComponent },
  { path: 'administracion', component: AdministracionComponent },
  { path: 'administracion/formulario-producto', component: FormProductComponent },
  { path: 'administracion/formulario-producto/:id', component: FormProductComponent },
  { path: 'administracion/formulario-categoria', component: FormCategoryComponent },
  { path: 'administracion/formulario-categoria/:id', component: FormCategoryComponent },
  { path: '**', redirectTo: '/inicio' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
