import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class PitchService {

  constructor(private httpCLient: HttpClient) { }

  getAllPitchByCmpId(id: any) {
    return this.httpCLient.get(`${baseURL}/api/comp/pitch/cmp=` + id);
  }

  getPitchById(id: any) {
    return this.httpCLient.get(`${baseURL}/api/comp/pitch/` + id);
  }

  createPitch(data: any) {
    return this.httpCLient.post(`${baseURL}/api/comp/pitch`, data);
  }

  updatePitch(data: any) {
    return this.httpCLient.put(`${baseURL}/api/comp/pitch`, data);
  }

  deletePitch(id: any) {
    return this.httpCLient.delete(`${baseURL}/api/comp/pitch/` + id);
  }
}
