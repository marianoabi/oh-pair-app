import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Network } from "../utilities/network";
import { Observable } from "rxjs/Observable";
import { environment } from "../environment/environment";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ShopEaseService {
  network: any;
  credentials = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.network = new Network(this.http);
  }

  public signup(user: any): Observable<any> {
    console.log("POST: Signup");
    console.log("Params: ", user);
    const param = {
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      password: user.password,
      address: user.address,
      city: user.city,
      province: user.province,
      country: user.country,
      phone: user.phone
    };
    return this.http.post(`${environment.dev_url}/Signup`, param);
  }

  public login(username, password): Observable<any> {
    console.log("POST: Login");
    return this.http.get(
      `${environment.dev_url}/Login/${username}/${password}`
    );
  }

  public getProducts(p, s): Observable<any> {
    console.log("GET: getProducts");
    return this.http.get(`${environment.dev_url}/Products`, {
      params: { page: p, search: s }
    });
  }

  public checkout(order: any): Observable<any> {
    console.log("POST: Checkout");
    console.log("Params: ", order);
    return this.http.post(`${environment.dev_url}/Checkout`, order);
  }

  public getProductDetails(id): Observable<any> {
    console.log("GET: getProductDetails");
    console.log("Params: ", id);
    return this.http.get(`${environment.dev_url}/Product/${id}`);
  }

  public getOrderDetails(id): Observable<any> {
    console.log("GET: getOrderDetails");
    console.log("Params: ", id);
    return this.http.get(`${environment.dev_url}/OrderDetails`, id);
  }

  public getProductsByBrand(id): Observable<any> {
    console.log("GET: getProductsByCategory");
    console.log("Params: ", id);
    return this.http.get(`${environment.dev_url}/Products/Brand/${id}`, id);
  }
}
