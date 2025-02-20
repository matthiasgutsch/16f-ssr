import { HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  size: number;
  private apiUrl = 'https://api.startupinspire.com';

   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private authToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  
  constructor(private http: HttpClient,
    handler: HttpBackend
    ) {
    this.http = new HttpClient(handler);

  }


  getParams(params: HttpParams, pars: any): HttpParams {
    if (pars.name) {
      params = params.append('name', pars.name);
    }
    if (pars.description) {
      params = params.append('description', pars.description);
    }
    if (pars.code) {
      params = params.append('code', pars.code);
    }
    if (pars.brand) {
      params = params.append('brand', pars.brand);
    }
    if (pars.dateFrom) {
      params = params.append('date_from', pars.dateFrom);
    }
    if (pars.employee) {
      params = params.append('employee', pars.employee);
    }
    if (pars.dateTo) {
      params = params.append('date_to', pars.dateTo);
    }

    if (pars.category) {
      params = params.append('category', pars.category);
    }
    if (pars.type) {
      params = params.append('type', pars.type);
    }
    if (pars.location_id) {
      params = params.append('location_id', pars.location_id);
    }
    if (pars.bathrooms) {
      params = params.append('bathrooms', pars.bathrooms);
    }
    if (pars.floors) {
      params = params.append('floors', pars.floors);
    }

     if (pars.sizeFrom) {
      params = params.append('sizeFrom', pars.sizeFrom);
    }
    if (pars.sizeTo) {
      params = params.append('sizeTo', pars.sizeTo);
    }

    if (pars.roomFrom) {
      params = params.append('roomFrom', pars.roomFrom);
    }
    if (pars.roomTo) {
      params = params.append('roomTo', pars.roomTo);
    }
    if (pars.priceFrom) {
      params = params.append('priceFrom', pars.priceFrom);
    }
    if (pars.priceTo) {
      params = params.append('priceTo', pars.priceTo);
    }

    params = params.append('_start', pars.page);
    if (pars.size) {
      params = params.append('_limit', pars.size);
    }
    if (pars.orderBy) {
      params = params.append('orderBy', pars.orderBy);
    }
    if (pars.orderByType) {
      params = params.append('orderByType', pars.orderByType);
    }
    return params;
  }



  getAll(pars: any): Observable<Book[]> {
     const header = new HttpHeaders().set(
      "Authorization",
       this.authToken,
    );
    let params = new HttpParams();
    params = this.getParams(params, pars);
    return this.http
    .get<HttpResponse<any[]>>(`${this.apiUrl}/startups/list_public`, {headers:header,
      observe: 'response',
        params,
      })
      .pipe(
        map((res: any) => {
          this.size =
          res.headers.get('x-total-count') != null ? + res.headers.get('x-total-count') : 0;
          const ts: any = res.body;
          return ts;
        }),
        catchError(this.handleError)
      );
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${isbn}`);
  }

  remove(isbn: string): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/books/${isbn}`);
  }

  getAllSearch(term: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books/search/${term}`).pipe(
      catchError(err => {
        console.error(err);
        return of([]);
      })
    );
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books`, book);
  }

  update(book: Book): Observable<Book> {
    return this.http.put<Book>(
      `${this.apiUrl}/books/${book.id}`,
      book
    );
  }

  check(isbn: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/books/${isbn}/check`
    );
  }

   
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.

    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
