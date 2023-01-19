import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component,';
import { MarketplaceComponent } from './components/marketplace/marketplace.component,';
import { RegisterComponent } from './components/register/register.component,';





const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'marketplace', component: MarketplaceComponent},
  {path: 'register', component: RegisterComponent},

  // {path: 'products', component: ProductsGridComponent},
  // {path: 'addproduct', component: InputProductsComponent},
  // {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
