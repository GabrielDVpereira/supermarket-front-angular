import { Injectable } from '@angular/core';
import { Market } from './Market';

@Injectable({
  providedIn: 'root'
})
export class SharedMarketService {
// Component used to share markets data through nagivation between compoenents
  market: Market;
  constructor() { }
}
