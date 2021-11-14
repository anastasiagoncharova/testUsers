import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getListOfUsers(page, size, gender) {
    return this.http.get(`https://randomuser.me/api/?page=${page}&results=${size}&gender=${gender}`);
  }
}
