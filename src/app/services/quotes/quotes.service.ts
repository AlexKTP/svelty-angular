import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(private http: HttpClient) { }

  getRandomQuote() {
    return this.http.get('https://api.quotable.io/random').pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

  getQuotes() {
    return this.http.get('https://api.quotable.io/quotes').pipe(
      catchError(this.handleError)
    );
  }
}
