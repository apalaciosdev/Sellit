import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../../../services/utils.service';
import { CartService } from 'src/app/services/cart.service';
import { Location } from '@angular/common';
import { Product } from '../../../../../assets/models/product';
import { SalesHttpService } from '../../../../services/httpServices/sales.service';


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
    public utilsService: UtilsService,
    public salesService: SalesHttpService,
    public cartService: CartService,
    public location: Location,
    private router: Router
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
    this.totalPrice = 0;
    this.products.forEach((product:any) => {
      this.totalPrice += Number(product.price) * Number(product.units);
    });
  }

  payProducts(){
    // let total = 0
    this.products.forEach((product:any) => {
      let sale = {
        "productId": product.uid,
        "units": product.units,
        "price":  product.price,
        "purchaseDate": new Date() 
      }
      this.salesService.postSale(sale).subscribe(
        (response) => { console.log("Venta subida"); this.vaciarCarrito()},
        (error) => { console.log(error); }
      ); 
    });
  }

  vaciarCarrito(){
    this.cartService.deleteCart();
    this.router.navigate(['/']);
  }

  // async deleteProduct(uid: string){
  //   console.log("dale")
      
  //   await this.getProducts()
  //   this.httpService.reloadComponent(this.router)
    
  //   // this.ngOnInit();
  // }
  

}
