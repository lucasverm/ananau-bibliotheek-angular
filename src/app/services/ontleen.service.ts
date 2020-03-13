import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GebruikerItem } from '../models/gebruiker-item';

@Injectable({
  providedIn: 'root'
})
export class OntleenService {

  constructor(private http: HttpClient) { }

  public getOntleendeBoekenVanGebruiker(): Observable<GebruikerItem[]> {
    return this.http.get<GebruikerItem[]>(`${environment.apiUrl}/ontleen/GetOntleendeBoekenVanGebruiker`);
  }
}
