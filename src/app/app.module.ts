import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MarketPageComponent } from './market-page/market-page.component';
import { NewMarketComponent } from './new-market/new-market.component';
import { RegistrationComponent } from './registration/registration.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'

import { MarketService } from './market.service';
import { RegistrationService } from './registration.service';

import { TokenService } from './token.service';
import { SharedMarketService } from './shared-market.service'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MarketPageComponent,
    NewMarketComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [MarketService, RegistrationService, TokenService, SharedMarketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
