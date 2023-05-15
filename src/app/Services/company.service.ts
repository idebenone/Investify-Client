import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient: HttpClient) { }

  getCompById(id: any) {
    return this.httpClient.get(`${baseURL}/api/comp/` + id);
  }

  createCompProf(data: any) {
    return this.httpClient.post(`${baseURL}/api/comp`, data);
  }

  updateComProf(data: any) {
    return this.httpClient.put(`${baseURL}/api/comp`, data);
  }

  updateProfImage(data: any) {
    return this.httpClient.post(`${baseURL}/images/upload`, data);
  }


}
