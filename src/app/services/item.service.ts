import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItem$(id: String): Observable<Item> {
    return this.http.get(`${environment.apiUrl}/Item/${id}`).pipe(
      catchError(error => {
        //this.loadingError$.next(error.statusText);
        return of(null);
      }),
      map((item: any) => {
        return item;
      })
    );
  }


}
