import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { NewMarketComponent } from './new-market/new-market.component';
import { MarketPageComponent } from './market-page/market-page.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'market/new', component: NewMarketComponent},
  {path: 'market/page', component: MarketPageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'registration', component: RegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
