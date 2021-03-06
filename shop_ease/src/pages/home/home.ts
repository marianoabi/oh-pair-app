import { Component, ViewChild } from "@angular/core";
import { NavController, Slides, ToastController } from "ionic-angular";
import { ProductDetailsPage } from "../product-details/product-details";
import { Product } from "../../models/Product";
import { ProductManager } from "../../models/ProductManager";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { ShopEaseService } from "../../services/shop_ease.service";
import { ProductsByCategoryPage } from "../products-by-category/products-by-category";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild("productSlides") productSlides: Slides;

  products: any[];
  page: number;
  banners = [];
  searchString = "";

  constructor(
    public navCtrl: NavController,
    public productManager: ProductManager,
    public http: HttpClient,
    public storage: Storage,
    public shopEaseService: ShopEaseService,
    public toastCtrl: ToastController
  ) {
    this.banners = [
      "https://cdn.dribbble.com/users/2160766/screenshots/6776177/retouching_-_x_plr.jpg",
      "https://s3images.coroflot.com/user_files/individual_files/494449_8aGwx7GCIidNyrvAyQd9sfcwd.jpg"
    ];

    this.loadProducts(null);
  }

  ionViewDidLoad() {
    setInterval(() => {
      if (this.productSlides.getActiveIndex() == 3)
        this.productSlides.slideTo(0);

      this.productSlides.slideNext();
    }, 3000);
  }

  loadProducts(event) {
    console.log(event);
    if (event == null) {
      this.page = 1;
      this.products = [];
    } else {
      this.page++;
    }

    this.shopEaseService
      .getProducts(this.page, this.searchString)
      .subscribe((response: any) => {
        console.log("Products response = ", response);

        if (response) {
          this.products = this.products.concat(response.data);

          if (event != null) event.complete();

          //disable infinite scroll when fetched product is 0.
          if (response.data.length == 0) {
            this.page -= 1;
            event.enable(false);
            let toast = this.toastCtrl
              .create({
                message: "No more products!",
                duration: 3000
              })
              .present();
          }
        } else {
          alert("An error ocurred on fetching Products");
        }
      });
  }

  openProductsPage(id) {
    this.navCtrl.push(ProductDetailsPage, { product_id: id });
  }

  onSearch(event) {
    if (this.searchString.length > 0) {
      this.navCtrl.push(ProductsByCategoryPage, {
        title: "Search Result",
        searchString: this.searchString
      });
    } else {
      alert("Please enter your query.");
    }
  }
}
