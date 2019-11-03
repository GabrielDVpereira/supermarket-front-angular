import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedMarketService } from '../shared-market.service';
import { Market } from '../Market';
@Component({
  selector: 'app-market-page',
  templateUrl: './market-page.component.html',
  styleUrls: ['./market-page.component.scss']
})
export class MarketPageComponent implements OnInit {

  constructor(private _marketData: SharedMarketService) { }
  market: Market;

  ngOnInit() {
    this.market = this._marketData.market;
  }

}
