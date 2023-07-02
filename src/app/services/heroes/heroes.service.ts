import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { Router } from '@angular/router';
import { IHeroProfileDto } from 'src/app/models/hero-profile-dto.interface';

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

  getHeroById() {
    this.logger.info(HeroesService.name + ' Fetching hero by id: ' + localStorage.getItem('svelty-hero-id') as string)
    return this.http.get(this.apiUrl + '/user', { headers: this.headers, params: { id: localStorage.getItem('svelty-hero-id') as string } });

  }

  updateHeroProfile(hero: IHeroProfileDto) {
    this.logger.info(HeroesService.name + ' Updating hero: ' + hero.username)
    return this.http.post(this.apiUrl + '/updateUser', hero, { headers: this.headers, params: { id: localStorage.getItem('svelty-hero-id') as string } })
  }

  getHeroProfile() {
    this.logger.info(HeroesService.name + ' Fetching hero profile')
    return this.http.get(this.apiUrl + '/userProfile', { headers: this.headers, params: { id: localStorage.getItem('svelty-hero-id') as string } });
  }


}
