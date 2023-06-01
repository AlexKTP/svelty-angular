import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes/heroes.service';
import { LoggerService } from 'src/app/services/logger/logger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private heroesService: HeroesService, private logger: LoggerService) { }

  ngOnInit(): void {
    this.heroesService.getAllHeroes().subscribe({
      next: (nextValue) => {
        this.logger.info(HomeComponent.name + ' ' + ' All heroes retrieved')
      },
      error: (error) => {
        this.logger.error(HomeComponent + ' ' + error.message + ' ' + error.status)
      },
      complete: () => {
        // Handle completion
      }
    }
    )
  }



}
