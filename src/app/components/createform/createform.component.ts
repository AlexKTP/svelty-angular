import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITrack } from 'src/app/models/track.interface';
import { TrackService } from 'src/app/services/tracks/track.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { mergeMap } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { EventTypes } from 'src/app/models/event-types';

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

  backEndResponse: string = ''
  newTrackAdded: boolean = false
  showToast: boolean = false


  constructor(private builder: FormBuilder, private datePipe: DatePipe, private trackService: TrackService, private logger: LoggerService, private toastService: ToastService) { }

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
      userId: Number(localStorage.getItem('svelty-hero-id'))
    }

    this.trackService.addNewTrack(track).subscribe({
      next: (nextValue) => {


        // Generate the text to be displayed in the toast
        const bodyMessage = 'A new record is saved!'; // Replace with the generated text
        const title = 'Successfully Added'
        this.toastService.showToast(title, bodyMessage, EventTypes.Success)

        this.logger.info(CreateformComponent.name + ' New track Added!')
      },
      error: (error) => {
        this.logger.error(CreateformComponent + ' ' + error.message + ' ' + error.status)
        this.backEndResponse = error.message
        const bodyMessage = this.backEndResponse; // Replace with the generated text
        const title = 'Oops! Something goes wrong'
        this.toastService.showToast(title, bodyMessage, EventTypes.Error)
      },
      complete: () => {
        //
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




