import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoeListComponent } from './shoe/shoe-list/shoe-list.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import { ShoeDetailComponent } from './shoe/shoe-detail/shoe-detail.component';
import { ShoeCartComponent } from './shoe/shoe-cart/shoe-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoeListComponent,
    HeaderComponent,
    FooterComponent,
    ShoeDetailComponent,
    ShoeCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
