import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CountryData } from './country-data';

@Injectable({
  providedIn: 'root'
})
export class WorldBankService {
  private worldBankUrl = 'http://api.worldbank.org/v2/country/';

  constructor(private http: HttpClient) {}   

  getWorldBankInfo(countryCode: string): Observable<CountryData[]> {
    const url = `${this.worldBankUrl}${countryCode}?format=json`;
    console.log('API URL:', url);
    return this.http.get<CountryData[]>(url).pipe(
      tap(data => console.log('API response:', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

    private handleError(err: HttpErrorResponse) {
      let errorMessage = '';
      if(err.error instanceof ErrorEvent) {
        errorMessage = 'An error occurred: ${err.error.message}';
      } else {
        errorMessage = 'Server returned code: ${err.status}, error message is: ${err.message}';
      }
      console.error(errorMessage);
      return throwError(()=>errorMessage);

    }
   
}
