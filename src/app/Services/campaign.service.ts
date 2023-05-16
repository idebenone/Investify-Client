import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private httpClient: HttpClient) { }

  getAllPublicCamps() {
    return this.httpClient.get(`${baseURL}/api/comp/campaign`);
  }

  getAllCampByCmpId(id: any) {
    return this.httpClient.get(`${baseURL}/api/comp/campaign/cmp=` + id);
  }

  getCampByCampId(id: any) {
    return this.httpClient.get(`${baseURL}/api/comp/campaign/` + id);
  }

  addCamp(data: any) {
    return this.httpClient.post(`${baseURL}/api/comp/campaign`, data);
  }

  updateCamp(data: any) {
    return this.httpClient.put(`${baseURL}/api/comp/campaign`, data);
  }
}
