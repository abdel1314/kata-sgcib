import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Currency, CurrencyList } from './model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  searchCurrency(search: string): Observable<CurrencyList[]> {
    let url: string = this.baseUrl + 'currencies?search=' + search;
    return this.http.get<CurrencyList[]>(url)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      )
  }

  getCurrency(page: number, filter: string, search: string, currenciesPerPage?: number): Observable<CurrencyList[]> {
    let url: string = this.baseUrl + 'currencies?search=' + search + '&page=' + page + '&limit=' + currenciesPerPage + '&sortBy=' + filter;
    return this.http.get<CurrencyList[]>(url)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      )
  }

  getCurrencyById(id: string): Observable<Currency[]> {
    let url = this.baseUrl + `currencies/${id}`;
    return this.http.get<Currency[]>(url)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      )
  }

}