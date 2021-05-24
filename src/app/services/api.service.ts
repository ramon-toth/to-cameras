import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api/datasets';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getSpeed() {
    return this.http.get(this.apiUrl + '/speed', this.httpOptions);
  }
  getRedlight() {
    return this.http.get(this.apiUrl + '/redlight', this.httpOptions);
  }

  testLog(d: any) {
    return this.http.post('/api/log/location', d, this.httpOptions);
  }
}
