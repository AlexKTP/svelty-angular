import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes/heroes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getAllHeroes();
  }



}
