import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ShoeListComponent} from './shoe/shoe-list/shoe-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {ShoeDetailComponent} from './shoe/shoe-detail/shoe-detail.component';
import {ShoeCartComponent} from './shoe/shoe-cart/shoe-cart.component';
import {SecurityComponent} from './security/security.component';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "angularx-social-login";
import { ShoeHistoryComponent } from './shoe/shoe-history/shoe-history.component';

const googleLoginOptions = {
  scope: 'profile email',
  plugin_name: 'login'
};
@NgModule({
  declarations: [
    AppComponent,
    ShoeListComponent,
    HeaderComponent,
    FooterComponent,
    ShoeDetailComponent,
    ShoeCartComponent,
    SecurityComponent,
    ShoeHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '612774287153-uthnsrl25on17doe8413il68ebv9c969.apps.googleusercontent.com',
            googleLoginOptions
          )
        },
      ]
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
