import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, of } from 'rxjs';
import { GebruikerItem } from '../models/gebruiker-item.model';
import { map, catchError } from 'rxjs/operators';
import { AccountService } from './account.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OntleenService {

  constructor(private router: Router, private http: HttpClient, private accountService: AccountService) { }

  getOntleendeBoekenVanGebruiker$(vanaf: number, hoeveelheid: number): Observable<any[]> {
    return this.http.get(`${environment.apiUrl}/ontleen/GetOntleendeBoekenVanGebruiker?vanaf=${vanaf}&hoeveelheid=${hoeveelheid}`).pipe(
      catchError(error => {
        if (error.status == 401) {
          this.accountService.logout();
          this.router.navigate([`/login`], { state: { errorMessage: 'Uw login token is verstreken: log je opnieuw in!' } })
        }
        return of(null);
      }),
      map((list: any[]): any[] => {
        list["gebruikerItems"] = list["gebruikerItems"].map(GebruikerItem.fromJSON)
        return list;
      })
    );
  }

  public scanItemIn$(id: string): Observable<{}> {
    return this.http.post(`${environment.apiUrl}/Ontleen/scan?id=${id}`, id);
  }

  getOntleenHistorieVanGebruiker$(vanaf: number, hoeveelheid: number): Observable<any[]> {
    return this.http.get(`${environment.apiUrl}/ontleen/GetOntleenHistorieVanGebruiker?vanaf=${vanaf}&hoeveelheid=${hoeveelheid}`).pipe(
      catchError(error => {
        if (error.status == 401) {
          this.accountService.logout();
          this.router.navigate([`/login`], { state: { errorMessage: 'Uw login token is verstreken: log je opnieuw in!' } })
        }
        return of(null);
      }),
      map((list: any[]): any[] => {
        list["gebruikerItems"] = list["gebruikerItems"].map(GebruikerItem.fromJSON)
        return list;
      })
    );
  }
}
