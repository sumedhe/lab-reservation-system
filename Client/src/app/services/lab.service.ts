import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lab } from '../models/lab.model';

@Injectable({
  providedIn: 'root'
})
export class LabService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:4200/api/labs/';

  // Get labs
  getLabList() {
    return this.http.get(this.baseURL);
  }

  // Post lab
  postLab(lab: Lab) {
    return this.http.post(this.baseURL, lab);
  }

  // Post lab
  putLab(lab: Lab) {
    return this.http.put(this.baseURL + lab._id, lab);
  }

  // Delete lab
  deleteLab(lab: Lab) {
    return this.http.delete(this.baseURL + lab._id);
  }
}
