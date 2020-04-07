import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private router: Router, private accountService: AccountService, private http: HttpClient) { }

  getItemById$(id: string): Observable<Item> {
    return this.http.get(`${environment.apiUrl}/Item/byId/${id}`).pipe(
      catchError(error => {
        if (error.status == 401) {
          this.accountService.logout();
          this.router.navigate([`/login`], { state: { errorMessage: 'Uw login token is verstreken: log je opnieuw in!' } })
        }
        return of(null);
      }),
      map((item: any): Item => {
        item = Item.fromJSON(item);
        return item;
      })
    );
  }

  getItemByName$(naam: string): Observable<Item> {
    return this.http.get(`${environment.apiUrl}/Item/byName/${naam}`).pipe(
      catchError(error => {
        if (error.status == 401) {
          this.accountService.logout();
          this.router.navigate([`/login`], { state: { errorMessage: 'Uw login token is verstreken: log je opnieuw in!' } })
        }
        return of(null);
      }),
      map((item: any): Item => {
        return Item.fromJSON(item);
      })
    );
  }

  deleteItem$(item: Item): Observable<Item> {
    return this.http.delete(`${environment.apiUrl}/Item/${item.id}`).pipe(
      catchError(error => {
        if (error.status == 401) {
          this.accountService.logout();
          this.router.navigate([`/login`], { state: { errorMessage: 'Uw login token is verstreken: log je opnieuw in!' } })
        }
        return of(null);
      }),
      map((item: any): Item => {
        item = Item.fromJSON(item);
        return item;
      })
    );
  }

  addItem$(naam: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Item`,
      { naam }, { responseType: 'json' })
      .pipe(
        catchError(error => {
          if (error.status == 401) {
            this.accountService.logout();
            this.router.navigate([`/login`], { state: { errorMessage: 'Uw login token is verstreken: log je opnieuw in!' } })
          }
          return of(null);
        }),
        map((item: any): Item => {
          item = Item.fromJSON(item);
          return item;
        })
      );
  }

  putItem$(item: Item): Observable<any> {
    return this.http.put(`${environment.apiUrl}/Item/${item.id}`,
      {
        id: item.id,
        naam: item.naam,
        gearchiveerd: item.gearchiveerd
      }, { responseType: 'json' })
      .pipe(
        catchError(error => {
          if (error.status == 401) {
            this.accountService.logout();
            this.router.navigate([`/login`], { state: { errorMessage: 'Uw login token is verstreken: log je opnieuw in!' } })
          }
          return of(null);
        }),
        map((item: any): Item => {
          item = Item.fromJSON(item);
          return item;
        })
      );
  }

  getItemContainsWordInName$ = (naam: string): Observable<Item[]> => {
    return this.http.get<Item[]>(`${environment.apiUrl}/Item/byContainsName/${naam}`);
  };

  getItemsWithFilter$(
    itemsVanaf: number,
    aantalItems: number,
    NaamSorterenASC: boolean,
    NaamSorterenDESC: boolean,
    BeschikbaarSorterenASC: boolean,
    BeschikbaarSorterenDESC: boolean,
    ToegevoegdOpSorterenASC: boolean,
    ToegevoegdOpSorterenDESC: boolean,
    ItemFilter: string,
    BeschikbaarFilter: string,
    Gearchiveerd: Boolean): Observable<Item[]> {
    return this.http.post(`${environment.apiUrl}/Item/getAllWithFilter`,
      {
        itemsVanaf,
        aantalItems,
        NaamSorterenASC,
        NaamSorterenDESC,
        BeschikbaarSorterenASC,
        BeschikbaarSorterenDESC,
        ToegevoegdOpSorterenASC,
        ToegevoegdOpSorterenDESC,
        ItemFilter,
        BeschikbaarFilter,
        Gearchiveerd
      },
      { responseType: 'json' })
      .pipe(
        catchError(error => {
          if (error.status == 401) {
            this.accountService.logout();
            this.router.navigate([`/login`], { state: { errorMessage: 'Uw login token is verstreken: log je opnieuw in!' } })
          }
          return of(null);
        }),
        map((json: any[]): any[] => {
          json["items"] = json["items"].map(Item.fromJSON);
          return json;
        })
      );
  }
}
