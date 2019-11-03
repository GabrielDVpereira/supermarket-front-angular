import { Component, OnInit } from '@angular/core';
import  { Market } from '../Market';
import { MarketService } from '../market.service';
import { TokenService } from '../token.service';
import { SharedMarketService } from '../shared-market.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  markets: Market[];
  categories: string[] = [];
  constructor(private marketService : MarketService, private tokenService: TokenService, private _marketData: SharedMarketService, private router: Router) { }

  ngOnInit() {
    this.marketService.markets().subscribe(
      (response: []) => {
        this.markets = response;
        this.createCategories(this.markets)
        console.log(this.markets)
      } , 
      (err) => {
        console.log(err);
      })
  }

  createCategories(markets : Market[]){
    markets.forEach(market => {
      let category_exist = this.categories.some(category => {
        return category === market.category;
      })
      if(!category_exist){
        this.categories.push(market.category);
      }
     })
  }

  navigateToPage(market){
    this._marketData.market = market; 
    this.router.navigateByUrl('/market/page');
  }

}
