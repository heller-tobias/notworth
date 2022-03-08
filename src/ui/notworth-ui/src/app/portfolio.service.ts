import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { Category } from './models/category';
import { Portfolio } from './models/portfolio';
import { Position } from './models/position';
import { Value } from './models/value';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private baseURL = environment.apiURL + '/';
  private portfoliosURL = `portfolios`;
  private positionsURL = `positions`;
  private valuesURL = `values`;
  private categoriesURL = `categories`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET Portfolios from the server */
  getPortfolios(): Observable<Portfolio[]> {
    return this.http
      .get<Portfolio[]>(`${this.baseURL}${this.portfoliosURL}`)
      .pipe(
        tap((_) => this.log('fetched Portfolios')),
        catchError(this.handleError<Portfolio[]>('getPortfolios', []))
      );
  }

  /** GET Portfolio from the server */
  getPortfolio(portfolioId: string): Observable<Portfolio> {
    return this.http
      .get<Portfolio>(`${this.baseURL}${this.portfoliosURL}/${portfolioId}`)
      .pipe(
        tap((_) => this.log(`fetched Portfolio with id ${portfolioId}`)),
        catchError(this.handleError<Portfolio>('getPortfolio', undefined))
      );
  }

  /** POST Portfolio */
  createPortfolio(portfolio: Portfolio): Observable<string> {
    return this.http
      .post<string>(
        `${this.baseURL}${this.portfoliosURL}`,
        portfolio,
        this.httpOptions
      )
      .pipe(
        tap((portfolioId: string) =>
          this.log(`created portfolio w/ id=${portfolioId}`)
        ),
        catchError(this.handleError<string>('createPortfolio'))
      );
  }

  /** GET Position from the server */
  getPosition(portfolioId: string, positionId: string): Observable<Position> {
    return this.http
      .get<Position>(
        `${this.baseURL}${this.portfoliosURL}/${portfolioId}/${this.positionsURL}/${positionId}`
      )
      .pipe(
        tap((_) => this.log(`fetched Position with id ${positionId}`)),
        catchError(this.handleError<Position>('getPosition', undefined))
      );
  }

  /** POST Position */
  createPosition(portfolio: Portfolio, position: Position): Observable<string> {
    return this.http
      .post<string>(
        `${this.baseURL}${this.portfoliosURL}/${portfolio.id}/${this.positionsURL}`,
        position,
        this.httpOptions
      )
      .pipe(
        tap((positionId: string) =>
          this.log(`created position w/ id=${positionId}`)
        ),
        catchError(this.handleError<string>('createPosition'))
      );
  }

  /** POST Value */
  createValue(
    portfolio: Portfolio,
    position: Position,
    value: Value
  ): Observable<string> {
    return this.http
      .post<string>(
        `${this.baseURL}${this.portfoliosURL}/${portfolio.id}/${this.positionsURL}/${position.id}/${this.valuesURL}`,
        value,
        this.httpOptions
      )
      .pipe(
        tap((positionId: string) =>
          this.log(`created position w/ id=${positionId}`)
        ),
        catchError(this.handleError<string>('createPosition'))
      );
  }

  /** GET Categories */
  getCategories(portfolio: Portfolio): Observable<Array<Category>> {
    return this.http
      .get<Array<Category>>(
        `${this.baseURL}${this.portfoliosURL}/${portfolio.id}/${this.categoriesURL}`
      )
      .pipe(
        tap((categories) => this.log(`fetched categories ${categories}`)),
        catchError(
          this.handleError<Array<Category>>('getCategories', undefined)
        )
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
