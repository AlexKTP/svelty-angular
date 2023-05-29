import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-auth-service',
  templateUrl: './auth-service.component.html',
  styleUrls: ['./auth-service.component.css']
})
export class AuthServiceComponent {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Connection': 'keep-alive',
  });

  register(username: string, password: string, login: string): Observable<any> {
    const url = `${this.apiUrl}/register`;
    const body = JSON.stringify({ username: username, login: login, password: password });
    return this.http.post(url, body, { headers: this.headers });
  }

  login(username: string, login: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const body = JSON.stringify({ username: username, login: login, password: password });
    return this.http.post(url, body, { headers: this.headers });
  }

}
