import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from 'src/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserById(email: any) {
    return this.httpClient.get(`${baseURL}/api/user/` + email);
  }

  getUserInv(id: any) {
    return this.httpClient.get(`${baseURL}/api/user/inv/` + id);
  }

  updateUser(data: any) {
    return this.httpClient.put(`${baseURL}/api/user`, data);
  }
}
