import { Component, OnInit } from '@angular/core';
import { SharedMarketService } from '../shared-market.service';
import { Market } from '../Market';
import { Product } from '../Product';
import { TokenService } from '../token.service';
import * as jwt_decode from "jwt-decode";
import { ProductService } from '../product.service';
import {FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-market-page',
  templateUrl: './market-page.component.html',
  styleUrls: ['./market-page.component.scss']
})
export class MarketPageComponent implements OnInit {

  constructor(private _marketData: SharedMarketService, private tokenService : TokenService, private productService : ProductService, private formBuilder : FormBuilder) { }
  market: Market;
  products: Product[]; 
  currentUser; 

  productForm : FormGroup;
  imagePreview: any  = "../../assets/GalleryIcon.jpg";

  cardOn: boolean =  false;

  ngOnInit() {
    this.market = this._marketData.market;
    this.getDecodedAccessToken(this.tokenService.get());
    this.getProducts();
    this.createForm();
  }

  createForm(){
    this.productForm = this.formBuilder.group({
      thumbnail: [''],
      name: [''],
      price: ['']
    })
  }


  getDecodedAccessToken(token): any {
    try{
      this.currentUser =  jwt_decode(token);
    }
    catch(Error){
      this.currentUser = null;
    }
  }

  getProducts(){
    this.productService.list(this.market.id).subscribe(
      (response : Product[]) => {
        this.products = response;
        console.log(this.products)
      }, 
      (error) => {
        console.log(error);
      });
  }

  showCard(){
    this.cardOn = !this.cardOn;
    if(this.cardOn)
      document.getElementById("new-product-card").style.display = 'flex'
    else 
      document.getElementById("new-product-card").style.display = 'none'
  }

  onFileSelect(event){
    if(event.target.files.length > 0){
      const files = event.target.files; 
      this.productForm.get('thumbnail').setValue(files[0]);

      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = ((_event) => {
        this.imagePreview =  reader.result;
      })
    }
  }

  submitForm(){
    const formData = new FormData();
    formData.append('thumbnail', this.productForm.get('thumbnail').value);
    formData.append('name', this.productForm.get('name').value);
    formData.append('price', this.productForm.get('price').value);
    this.productService.create(this.market.id, formData).subscribe( 
    (response : Product) => {
      this.products.push(response)
    }, 
    error => {
      console.log(error)
    });
  }

  buyProduct(product_id){
    console.log(product_id);
    this.productService.delete(product_id).subscribe(
      deleted => {
        if(deleted){
          console.log(deleted);
         const productDeletedIndex =  this.products.findIndex((product : Product) => {
            return product.id === product_id;
          })
          console.log(productDeletedIndex);
          this.products.splice(0 , productDeletedIndex || 1); 
        }
      },
      error => {
        console.log(error);
      }
    )
  }
}
