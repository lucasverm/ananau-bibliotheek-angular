import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) { }

  /*getItem$(id: String): Observable<Item> {
    return this.http.get<Item>(`${environment.apiUrl}/Item/byId/${id}`);
  }*/

  getItem$(id: string): Observable<Item> {
    return this.http.get(`${environment.apiUrl}/Item/byId/${id}`).pipe(
      catchError(error => {
        return of(null);
      }),
      map((item: any): Item => {
        item = Item.fromJSON(item);
        return item;
      })
    );
  }

  getItemByName$ = (naam: string): Observable<Item[]> => {
    return this.http.get<Item[]>(`${environment.apiUrl}/Item/byName/${naam}`);
  };
}
