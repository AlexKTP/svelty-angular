import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createform',
  templateUrl: './createform.component.html',
  styleUrls: ['./createform.component.css']
})
export class CreateformComponent implements OnInit {
  currentDate: string | null | undefined;
  firstDayOfTheTear: string | null | undefined;
  lastDayOfTheTear: string | null | undefined;

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
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
