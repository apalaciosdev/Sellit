import { Component, OnInit } from '@angular/core';
import { ProductsHttpService } from 'src/app/services/httpServices/products.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { SharedService } from 'src/app/shared.service';



@Component({
  selector: 'userProductsComponent',
  templateUrl: './userProducts.component.html',
  providers: [] //Utilizamos el servicio aqui
  // styleUrls: ['./app.component.css']
})



export class UserProductsComponent implements OnInit{

  products: any;

  userToken: any;
  
  constructor(
    private productsHttpService: ProductsHttpService,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.userToken = this.localStorageService.getItem('userToken');;
    this.getProducts(this.userToken.mail);
    // this.sharedService.userToken$.subscribe(userToken => {
      // });
  }
  


  async getProducts(user:any){
    this.productsHttpService.getUserProducts(user).subscribe(
      (response) => { this.products = response },
      (error) => { console.log(error); }
    ); 

    // setTimeout(() => {
    //   console.log(this.products)
    // }, 500);
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