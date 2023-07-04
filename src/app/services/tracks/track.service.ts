import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ITrack } from 'src/app/models/track.interface';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private apiUrl: string = "http://localhost:8080"
  private headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('svelty-token')}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  addNewTrack(track: ITrack) {

    const timeStamp = track.date != null ? new Date(track.date).getTime() : new Date().getTime()

    const url = `${this.apiUrl}/track`;
    const body = JSON.stringify({
      weight: track.weight, chest: track.chest,
      abs: track.abs, hip: track.hip, bottom: track.bottom, leg: track.leg,
      createdAt: timeStamp, toSynchronize: track.toSynchronize ? 1 : 0, userId: track.userId
    });
    return this.http.post(url, body, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  getTracks() {
    return this.http.get(`${this.apiUrl}/tracks`,
      { headers: this.headers, params: { userId: localStorage.getItem('svelty-hero-id') as string } }).pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

}
