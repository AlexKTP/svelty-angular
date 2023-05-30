import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private apiUrl: string = "http://localhost:8080"
  private headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });

  constructor(private http: HttpClient, private logger: LoggerService) { }

  getAllHeroes() {
    this.logger.info(HeroesService.name + ' Fetching all heroes')
    return this.http.get(this.apiUrl + '/users', { headers: this.headers })
  }
}
