import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../../../services/utils.service';
import { CartService } from 'src/app/services/cart.service';
import { Location } from '@angular/common';
import { Product } from '../../../../../assets/models/product';


@Component({
  selector: 'cartComponent',
  templateUrl: './cart.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./cart.component.css']
})



export class CartComponent implements OnInit{
  products:any;
  totalPrice:number = 0;
  
  constructor(
    public cartService: CartService,
    public location: Location
  ) {
  
  }

  async ngOnInit() {
    this.products = this.cartService.getItems()
    this.updateTotalPrice();
  }

  removeProductCart(productId:string){
    this.cartService.removeToCart(productId)
    this.products = this.cartService.getItems()
    this.updateTotalPrice();
  }


  sumUnits(productId:string, price:any){
    this.cartService.sumUnits(productId);
    let p = document.getElementById(`product${productId}`);
    let pPriceUnits = document.getElementById(`productPriceUnit${productId}`);
    if(p && pPriceUnits){
      p.innerText = (Number(p.textContent) + 1).toString();
      pPriceUnits.innerText = (Number(pPriceUnits.textContent) + price).toString();
    }
    this.totalPrice += price;
  }

  resUnits(productId:string, price:any){
    this.cartService.resUnits(productId);
    let p = document.getElementById(`product${productId}`);
    let pPriceUnits = document.getElementById(`productPriceUnit${productId}`);
    if(p && pPriceUnits){
      if(Number(p.textContent) > 1){
        p.innerText = (Number(p.textContent) - 1).toString();
        pPriceUnits.innerText = (Number(pPriceUnits.textContent) - price).toString();
      }

      else{
        this.removeProductCart(productId);
      }
    }
    this.totalPrice -= price;
  }

  updateTotalPrice(){
    this.products.forEach((product:any) => {
      this.totalPrice += Number(product.price) * Number(product.units);
    });
  }

  pagar(){
    // let total = 0
   

  }

  // async deleteProduct(uid: string){
  //   console.log("dale")
  //   this.httpService.deleteProduct(uid).subscribe(
  //     (response) => { console.log("Product dropped"); },
  //     (error) => { console.log(error); }
  //   ); 
      
  //   await this.getProducts()
  //   this.httpService.reloadComponent(this.router)
    
  //   // this.ngOnInit();
  // }
  

}
