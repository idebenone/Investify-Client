import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from 'src/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  //REGISTRATION APIS 
  initiateReg(data: any) {
    return this.httpClient.post(`${baseURL}/api/auth/initiate`, data);
  }

  verifyReg(data: any) {
    return this.httpClient.post(`${baseURL}/api/auth/verify`, data);
  }

  setPass(data: any) {
    return this.httpClient.post(`${baseURL}/api/auth/setpass`, data);
  }

  //LOGIN APIS
  login(data: any) {
    return this.httpClient.post(`${baseURL}/api/auth/login`, data);
  }

  getTokenFromStorage() {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  }

}
