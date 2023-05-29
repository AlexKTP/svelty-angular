import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private apiUrl: string = "http://localhost:8080"
  private headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });

  constructor(private http: HttpClient) { }

  getAllHeroes() {
    console.log("Fetching all heroes...")
    return this.http.get(this.apiUrl + '/users', { headers: this.headers }).subscribe({
      next(value) {
        console.log("AllHeroes are retrieved");
      },
    }
    )
  }
}
