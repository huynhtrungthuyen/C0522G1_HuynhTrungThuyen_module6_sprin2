import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShoeListComponent} from "./shoe/shoe-list/shoe-list.component";
import {ShoeDetailComponent} from "./shoe/shoe-detail/shoe-detail.component";
import {ShoeCartComponent} from "./shoe/shoe-cart/shoe-cart.component";
import {SecurityComponent} from "./security/security.component";
import {ShoeHistoryComponent} from "./shoe/shoe-history/shoe-history.component";
import {CustomerDetailComponent} from "./shoe/customer-detail/customer-detail.component";


const routes: Routes = [
  {path: '', component: ShoeListComponent},
  {path: 'detail/:id', component: ShoeDetailComponent},
  {path: 'cart', component: ShoeCartComponent},
  {path: 'login', component: SecurityComponent},
  {path: 'history', component: ShoeHistoryComponent},
  {path: 'info-customer', component: CustomerDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
