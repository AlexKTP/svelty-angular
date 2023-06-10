import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private apiUrl: string = "http://localhost:8080"
  private headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('svelty-token')}`
  });

  constructor(private http: HttpClient, private logger: LoggerService, private router: Router) { }

  getAllHeroes() {
    this.logger.info(HeroesService.name + ' Fetching all heroes')
    return this.http.get(this.apiUrl + '/users', { headers: this.headers })
  }

  logOut() {
    this.http.post(this.apiUrl + '/logout', {}, { headers: this.headers, params: { userId: localStorage.getItem('svelty-hero-id') as string } }).subscribe({
      next: data => {
        this.logger.info(HeroesService.name + ' Logged out')
        localStorage.removeItem('svelty-token');
        this.router.navigate(['/login'], { state: { animation: 'home <=> login' } });
      },
      error: error => {
        this.logger.error(HeroesService.name + ' Error logging out: ' + error.error.message)
      }
    })

  }
}
