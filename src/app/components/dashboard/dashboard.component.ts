import { Component } from '@angular/core';
import { Chart, registerables, ChartItem } from 'chart.js';
import { _DeepPartialArray } from 'chart.js/dist/types/utils';
import { ITrack } from 'src/app/models/track.interface';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { TrackService } from 'src/app/services/tracks/track.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  listOfTracks: ITrack[] = []

  constructor(private trackService: TrackService, private logger: LoggerService) {
    Chart.register(...registerables);
  }


  ngOnInit() {
    this.trackService.getTracks().subscribe({
      next: (nextValue) => {

        (nextValue as any[]).forEach((value) => {
          this.listOfTracks.push({
            id: value['id'],
            weight: value['weight'],
            chest: value['chest'],
            abs: value['abs'],
            hip: value['hip'],
            bottom: value['bottom'],
            leg: value['leg'],
            date: value['createdAt'],
            toSynchronize: value['toSynchronize'],
            userId: value['userId']
          } as ITrack)
        }
        )

        this.logger.info(DashboardComponent.name + ' Tracks loaded!')
      },
      error: (errorValue) => {
        this.logger.error(DashboardComponent.name + ' Error loading tracks!')
      },
      complete: () => {
        this.logger.info(DashboardComponent.name + 'Loading chart!')
        initChart(this.listOfTracks)
      }
    })
  }

}

function initChart(listOfTracks: ITrack[]) {
  const ctx: ChartItem = document.getElementById('myChart') as ChartItem;
  if (ctx == null) {
    console.log('ctx is null')
    return;
  }

  //take the date which is a timestamp and convert it to a date's string representation with a format 'dd/mm/yyyy'
  const myvalues = listOfTracks.map((track) => { console.log(track.date); return track.date != null ? new Date(track.date).toLocaleDateString() : new Date().toLocaleDateString() });

  const mydata = listOfTracks.map((track) => { return track.weight });



  new Chart(ctx, {
    type: 'line',
    data: {
      labels: myvalues,
      datasets: [{
        label: 'Weight',
        data: mydata,

        borderWidth: 3,
        pointStyle: 'circle',
        pointRadius: 10,
        pointHoverRadius: 15
      }]
    },
    options: {
      responsive: true,
      animations: {
        tension: {
          duration: 1000,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: true
        }
      },
      plugins: {
        title: {
          display: true
        }
      },
      scales: {
        x: {
          max: 10,
        },
        y: {
          suggestedMin: 50,
          suggestedMax: 80,
          ticks: {
            // forces step size to be 50 units
            stepSize: 2
          }
        }
      }
    }
  });
}
