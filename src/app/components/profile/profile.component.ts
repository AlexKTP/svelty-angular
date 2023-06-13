import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventTypes } from 'src/app/models/event-types';
import { IGoal } from 'src/app/models/goal.interface';
import { IHeroProfileDto } from 'src/app/models/hero-profile-dto.interface';
import { IHero } from 'src/app/models/hero.interface';
import { HeroesService } from 'src/app/services/heroes/heroes.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  hero: IHero | null = null;
  heroDTO: IHeroProfileDto | null = null;
  deadline: string | null = null;

  registerForm!: FormGroup;
  currentDate: string | null | undefined;


  constructor(private heroService: HeroesService,
    private logger: LoggerService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit(): void {

    this.heroService.getHeroProfile().subscribe({
      next: (nextValue) => {
        this.heroDTO = nextValue as IHeroProfileDto
        this.deadline = this.getGoalDeadline(this.heroDTO) != null ? this.getGoalDeadline(this.heroDTO) : null
        this.logger.info(ProfileComponent.name + ' Hero profile loaded!' + this.heroDTO.username)
      },
      error: (errorValue) => {
        this.logger.error(ProfileComponent.name + ' Error loading hero profile! ' + errorValue)
        const bodyMessage = 'Error!';
        const title = errorValue.error.message
        this.toastService.showToast(title, bodyMessage, EventTypes.Error)
      },
      complete: () => {
        //
      }
    });

    this.initDate()
    this.initForm()
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      weight: [null, Validators.required],
      date: [this.deadline != null ? this.deadline : this.currentDate]
    }, {});
  }

  initDate() {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  getGoalDeadline(heroDTO: IHeroProfileDto) {
    return heroDTO.goal?.deadLine != null ? this.datePipe.transform(new Date(heroDTO.goal.deadLine * 1000), 'yyyy-MM-dd') : null
  }

  registerFormSubmit() {
    this.logger.info(ProfileComponent.name + ' Form submitted!')

    var goal: IGoal = {
      id: null,
      weight: this.registerForm.get('weight')?.value,
      deadLine: this.registerForm.get('date')?.value != null ? new Date(this.registerForm.get('date')?.value).getTime() : null,
      userId: localStorage.getItem('svelty-hero-id') as unknown as number
    }

    this.heroDTO = {
      id: localStorage.getItem('svelty-hero-id') as unknown as string,
      username: this.registerForm.get('username')?.value,
      goal: goal
    }

    this.heroService.updateHeroProfile(this.heroDTO).subscribe({
      next: (nextValue) => {
        this.heroDTO = nextValue as IHeroProfileDto
        this.deadline = this.getGoalDeadline(this.heroDTO) != null ? this.getGoalDeadline(this.heroDTO) : null
        this.logger.info(ProfileComponent.name + ' Hero updated!' + this.heroDTO.username)
        const bodyMessage = 'Success!'; // Replace with the generated text
        const title = 'Successfully updated'
        this.toastService.showToast(title, bodyMessage, EventTypes.Success)
      },
      error: (errorValue) => {
        this.logger.error(ProfileComponent.name + ' Error updating hero! ' + errorValue)
        const bodyMessage = 'Error!';
        const title = errorValue.error.message
        this.toastService.showToast(title, bodyMessage, EventTypes.Error)
      }
    });
  }


}
