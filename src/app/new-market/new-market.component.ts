import { Component, OnInit } from '@angular/core';
import { MarketService } from '../market.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { SharedMarketService } from '../shared-market.service';
import { TokenService } from '../token.service';


@Component({
  selector: 'app-new-market',
  templateUrl: './new-market.component.html',
  styleUrls: ['./new-market.component.scss']
})
export class NewMarketComponent implements OnInit {
  name: string;
  selectedCategory: string;
  categoryArray: string[] = [
    "Eletrônicos", 
    "Eletrodomésticos",
    "Esportes",
    "Lazer",
    "Diversos"
  ];

  uploadForm: FormGroup;
  imagePath;
  imgURL: any;
  imageErrorMessage: string;

  constructor(private marketService: MarketService, private formBuilder : FormBuilder, private router: Router, private _marketData: SharedMarketService, private tokenService: TokenService ) { }
  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    })
  }
  createMarket(){
    let user = this.getDecodedAccessToken(this.tokenService.get());
    const formData = new FormData();
    formData.append('thumbnail', this.uploadForm.get('profile').value);
    formData.append('name', this.name);
    formData.append('category', this.selectedCategory);
    formData.append('owner_id', user._id);

    this.marketService.createMarket(formData).subscribe(
      (response) => {
        const market = response;
        this._marketData.market = market;
        this.router.navigateByUrl("/market/page"); 
        alert("Market successfuly created!")
      }, 
      (err)=>{
        console.log(err);
      }
    )

  }

  getDecodedAccessToken(token): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

    //file selector
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      this.uploadForm.get('profile').setValue(files[0]);

      //defining image preview
      let mimeType = files[0].type; 
      if(mimeType.match(/image\/*/) == null){
        //checking image type
        this.imageErrorMessage = "Only images are suported."
        return;
      }

      let reader = new FileReader(); //let the web  asynchronously read the contents of files
      this.imagePath = files;
      reader.readAsDataURL(files[0]); //read the file and return its URL in the result attribute
      reader.onload = (_event) => { //once read, it attributes the result to the imgURL
        this.imgURL = reader.result;
      }
    }
  }
}
