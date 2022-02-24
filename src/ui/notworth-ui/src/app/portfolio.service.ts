import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { Portfolio } from './models/portfolio';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private portfoliosUrl = `portfolios`;
  private base_url = `http://localhost:3000/`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  /** GET Portfolios from the server */
  getPortfolios(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(`${this.base_url}${this.portfoliosUrl}`)
      .pipe(
        tap(_ => this.log('fetched Portfolios')),
        catchError(this.handleError<Portfolio[]>('getPortfolios', []))
      );
  }

  /** GET Portfolio from the server */
  getPortfolio(portfolioId: string): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.base_url}${this.portfoliosUrl}/${portfolioId}`)
      .pipe(
        tap(_ => this.log(`fetched Portfolio with id ${portfolioId}`)),
        catchError(this.handleError<Portfolio>('getPortfolio', undefined))
      );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  /** Log a PortfolioService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PortfolioService: ${message}`);
  }
}
