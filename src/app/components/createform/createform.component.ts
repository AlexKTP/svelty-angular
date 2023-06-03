import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITrack } from 'src/app/models/track.interface';
import { TrackService } from 'src/app/services/tracks/track.service';
import { LoggerService } from 'src/app/services/logger/logger.service';

@Component({
  selector: 'app-createform',
  templateUrl: './createform.component.html',
  styleUrls: ['./createform.component.css']
})
export class CreateformComponent implements OnInit {
  currentDate: string | null | undefined;
  firstDayOfTheTear: string | null | undefined;
  lastDayOfTheTear: string | null | undefined;

  registerForm!: FormGroup;


  constructor(private builder: FormBuilder, private datePipe: DatePipe, private trackService: TrackService, private logger: LoggerService) { }

  ngOnInit() {
    this.initDate()
    this.initForm()
  }

  registerFormSubmit() {
    if (this.registerForm.get('weight')?.value == null || this.registerForm.get('weight')?.value < 0) {
    }
    const track: ITrack = {
      weight: this.registerForm.get('weight')?.value,
      chest: this.registerForm.get('chest')?.value,
      abs: this.registerForm.get('abs')?.value,
      hip: this.registerForm.get('hip')?.value,
      bottom: this.registerForm.get('bottom')?.value,
      leg: this.registerForm.get('thigh')?.value,
      date: this.registerForm.get('date')?.value,
      toSynchronize: true,
      userId: 17
    }

    this.trackService.addNewTrack(track).subscribe({
      next: (nextValue) => {
        this.logger.info(CreateformComponent.name + ' New track Added!')
      },
      error: (error) => {
        this.logger.error(CreateformComponent + ' ' + error.message + ' ' + error.status)
      },
      complete: () => {
        // Handle completion
      }

    })
  }

  initForm() {
    this.registerForm = this.builder.group({
      weight: [null, Validators.required],
      chest: [null],
      abs: [null],
      hip: [null],
      bottom: [null],
      thigh: [null],
      date: [this.currentDate]
    }, {});
  }

  initDate() {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    if (this.currentDate != null && this.currentDate != undefined) {
      var begin = new Date();
      begin.setFullYear(new Date().getFullYear());
      begin.setDate(1);
      begin.setMonth(0);
      this.firstDayOfTheTear = this.datePipe.transform(begin, 'yyyy-MM-dd');
      var end = begin;
      end.setMonth(12);
      this.lastDayOfTheTear = this.datePipe.transform(end, 'yyyy-MM-dd');
    }
  }

}
