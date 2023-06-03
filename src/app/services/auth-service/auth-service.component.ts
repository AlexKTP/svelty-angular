import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceComponent {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  register(username: string, password: string, login: string): Observable<any> {
    const url = `${this.apiUrl}/register`;
    const body = JSON.stringify({ username: username, login: login, password: password, creationDate: null, lastModificationDate: null });
    return this.http.post(url, body, { headers: this.headers });
  }

  login(username: string, login: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const body = JSON.stringify({ username: username, login: login, password: password, creationDate: null, lastModificationDate: null });
    return this.http.post(url, body, { headers: this.headers });
  }

  checkToken(): Observable<any> {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    const url = `${this.apiUrl}/token`;
    return this.http.get(url, { headers: this.headers });
  }



}
