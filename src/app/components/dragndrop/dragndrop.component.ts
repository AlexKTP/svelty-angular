import { Component, OnInit } from '@angular/core';
import { EventTypes } from 'src/app/models/event-types';
import { ITrack } from 'src/app/models/track.interface';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrackService } from 'src/app/services/tracks/track.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-dragndrop',
  templateUrl: './dragndrop.component.html',
  styleUrls: ['./dragndrop.component.css']
})
export class DragndropComponent {

  constructor(private trackService: TrackService, private toastService: ToastService) { }

  isHovered = false;
  isLoading = false;

  onFileDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.isLoading = false;

    if (files.length > 1 || files[0].type !== 'text/csv') {
      console.log('Invalid file type. Only single CSV files are supported.');
      this.isLoading = false;
      return;
    }

    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array((e.target as FileReader).result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        jsonData.forEach((element: any) => {
          let parts = element['Date'].split("/");
          let parsedDate = new Date(+parts[2], parts[1] - 1, +parts[0]);
          const track: ITrack = {
            weight: element['Weight'],
            chest: element['Chest'],
            abs: element['Abs'],
            hip: element['Hip'],
            bottom: element['Bottom'],
            leg: element['Leg'],
            date: parsedDate,
            toSynchronize: true,
            userId: localStorage.getItem('svelty-hero-id') as unknown as number
          }

          console.log(track);

          this.trackService.addNewTrack(track).subscribe({
            next: (nextValue) => {
              console.log('Track added successfully!');
            },
            error: (errorValue) => {
              console.log('Error adding track!');
              this.toastService.showToast('Error!', 'Error adding tracks!', EventTypes.Error);
            },
            complete: () => {
              console.log('Track adding completed!');
              this.toastService.showToast('Success!', 'Tracks added successfully!', EventTypes.Success);
            }
          });
        });
        console.log(jsonData);
        this.isLoading = false;
      };

      reader.readAsArrayBuffer(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isHovered = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isHovered = false;
  }

}


