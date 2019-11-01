import { Component, OnInit } from '@angular/core';
import  { Market } from '../Market';
import { MarketService } from '../market.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  markets: Market[];
  categories: string[] = [];
  constructor(private marketService : MarketService) { }

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

}
