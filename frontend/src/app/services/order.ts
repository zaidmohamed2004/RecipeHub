import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface CheckoutData {
  shippingAddress: string;
  phone: string;
  paymentMethod: string;
}


export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}


export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  shippingAddress: string;
  phone: string;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}


export interface CheckoutResponse {
  msg: string;
  order: Order;
}


@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private apiUrl = 'http://localhost:7777/orders';


  constructor(
    private http: HttpClient
  ) {}


  checkout(
    data: CheckoutData
  ): Observable<CheckoutResponse> {

    return this.http.post<CheckoutResponse>(
      `${this.apiUrl}/checkout`,
      data
    );

  }

}