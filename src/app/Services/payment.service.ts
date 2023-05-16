import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  initTrans(data: any) {
    this.httpClient.post(`${baseURL}/api/payment/trans`, data);
  }


}
