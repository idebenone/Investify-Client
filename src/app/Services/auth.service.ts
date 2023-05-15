import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from 'src/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  isTokenRequired(url: string): boolean {
    return !url.includes(`${baseURL}/api/auth/initiate`) && !url.includes(`${baseURL}/api/auth/verify`) && !url.includes(`${baseURL}/api/auth/login`) && !url.includes(`${baseURL}/api/auth/setpass`);
  }


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

  isTokenExist() {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  }
  getToken() {
    return localStorage.getItem("token");
  }

}
