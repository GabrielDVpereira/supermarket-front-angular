import { Component, OnInit } from '@angular/core';
import { MarketService } from '../market.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-market',
  templateUrl: './new-market.component.html',
  styleUrls: ['./new-market.component.scss']
})
export class NewMarketComponent implements OnInit {
  category: string;
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

  constructor(private marketService: MarketService, private formBuilder : FormBuilder, private router: Router) { }
  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    })
    console.log(this.uploadForm)
  }
  createMarket(){
    let user = this.getDecodedAccessToken();
    const formData = new FormData();
    formData.append('thumbnail', this.uploadForm.get('profile').value);
    formData.append('name', this.name);
    formData.append('category', this.category);
    formData.append('owner_id', user._id);
    this.marketService.createMarket(formData).subscribe(
      (response) => {
        this.router.navigateByUrl('/market/page'); 
        alert("Market successful created!")
        console.log(response)
      }, 
      (err)=>{
        console.log(err);
      }
    )

  }

  getDecodedAccessToken(): any {
    try{
        return jwt_decode(localStorage.getItem("token"));
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

      let reader = new FileReader(); //let the web read asynchronously read the contents of files
      this.imagePath = files;
      reader.readAsDataURL(files[0]); //read the file and return its URL in the result attribute
      reader.onload = (_event) => { //once read, it attributes the result to the imgURL
        this.imgURL = reader.result;
      }
    }
  }
}
