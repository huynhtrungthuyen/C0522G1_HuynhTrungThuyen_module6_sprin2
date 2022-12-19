import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IShoeDto} from "../model/i-shoe-dto";
import {DataResult} from "../model/data-result";
import {IType} from "../model/i-type";
import {IShoeSizeDto} from "../model/i-shoe-size-dto";
import {ICustomer} from "../model/i-customer";
import {IEmployee} from "../model/i-employee";
import {ICart} from "../model/i-cart";

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class ShoeService {

  constructor(private httpClient: HttpClient) {
  }

  showListShoe(curPage: number, numberRecord: number, nameS: string, manufacturerS: string, typeS: string,
               priceStart: any, priceEnd: any, sortBy: string): Observable<DataResult<IShoeDto>> {
    return this.httpClient.get<DataResult<IShoeDto>>(API_URL + '/shoe/list-' + sortBy + '/' + nameS + '&' + manufacturerS
      + '&' + typeS + '&' + priceStart + '&' + priceEnd + '?page=' + (curPage - 1) + '&size=' + numberRecord);
  }

  findAllShoeType(): Observable<IType[]> {
    return this.httpClient.get<IType[]>(API_URL + '/shoe/type-list');
  }

  findAllManufacturer(): Observable<string[]> {
    return this.httpClient.get<string[]>(API_URL + '/shoe/manufacturer-list');
  }

  findShoeById(id: number): Observable<IShoeDto> {
    return this.httpClient.get<IShoeDto>(API_URL + '/shoe/detail/' + id);
  }

  findAllSizeByShoe(id: number): Observable<IShoeSizeDto[]> {
    return this.httpClient.get<IShoeSizeDto[]>(API_URL + '/shoe/shoes-size/' + id);
  }

  findCustomer(username: string): Observable<ICustomer> {
    return this.httpClient.get<ICustomer>(API_URL + '/shoe/get-customer/' + username);
  }

  addToCart(quantity: number, customerId: number, shoeSizeId: number): Observable<void> {
    return this.httpClient.get<void>(API_URL + '/shoe/add-cart/' + quantity + '&' + customerId + '&' + shoeSizeId);
  }

  getQuantitySellById(id: number): Observable<number> {
    return this.httpClient.get<number>(API_URL + '/shoe/quantity-sell/' + id);
  }

  findCartByUser(id: number): Observable<ICart[]> {
    return this.httpClient.get<ICart[]>(API_URL + '/shoe/cart/' + id);
  }

  removeCartById(id: number): Observable<void> {
    return this.httpClient.get<void>(API_URL + '/shoe/remove-cart/' + id);
  }

  ascQuantityCart(id: number): Observable<void> {
    return this.httpClient.get<void>(API_URL + '/shoe/asc-quantity/' + id);
  }

  descQuantityCart(id: number): Observable<void> {
    return this.httpClient.get<void>(API_URL + '/shoe/desc-quantity/' + id);
  }

  sumQuantityCartById(id: number): Observable<number> {
    return this.httpClient.get<number>(API_URL + '/shoe/quantity-cart/' + id);
  }

  paymentShoe(id: number): Observable<void> {
    return this.httpClient.get<void>(API_URL + '/shoe/payment-shoe/' + id);
  }
}
