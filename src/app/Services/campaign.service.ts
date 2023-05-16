import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private httpClient: HttpClient) { }

  //ALL CAMPAIGNS
  getAllPublicCamps() {
    return this.httpClient.get(`${baseURL}/api/comp/campaign`);
  }

  //GET CAMAPAIGNS BY CMP ID
  getAllCampByCmpId(id: any) {
    return this.httpClient.get(`${baseURL}/api/comp/campaign/cmp=` + id);
  }

  //GET CAMP BY ID FOR PUBLIC
  getCampByCampId(id: any) {
    return this.httpClient.get(`${baseURL}/api/comp/campaign/` + id);
  }

  //GET CAMP BY IF FOR COMPS
  getCmpCampById(id: any) {
    return this.httpClient.get(`${baseURL}/api/comp/campaign/cmp/` + id);
  }

  addCamp(data: any) {
    return this.httpClient.post(`${baseURL}/api/comp/campaign`, data);
  }

  updateCamp(data: any) {
    return this.httpClient.put(`${baseURL}/api/comp/campaign`, data);
  }
}
