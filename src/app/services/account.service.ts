import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gebruiker } from '../models/gebruiker.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private readonly _tokenKey = 'currentUser';
    public user: BehaviorSubject<Gebruiker>;
    public huidigeGebruiker: Observable<Gebruiker>;
    public redirectUrl: string;

    constructor(private http: HttpClient) {
        let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
        if (parsedToken) {
            const expires =
                new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
            if (expires) {
                localStorage.removeItem(this._tokenKey);
                parsedToken = null;
            }
        }

        this.user = new BehaviorSubject<Gebruiker>(
            JSON.parse(localStorage.getItem('loggedUser'))
        );
        this.huidigeGebruiker = this.user.asObservable();
    }

    public login(email: string, password: string): Observable<boolean> {
        return this.http
            .post(
                `${environment.apiUrl}/Gebruiker`,
                { email, password },
                { responseType: 'text' }
            )
            .pipe(
                map((token: any) => {
                    if (token) {
                        const local = JSON.parse(token);
                        localStorage.setItem(this._tokenKey, local.token);
                        localStorage.setItem(
                            'loggedUser',
                            JSON.stringify(local.user)
                        );
                        this.user.next(local.user);
                        return true;
                    } else {
                        return false;
                    }
                })
            );
    }

    public registreer(voornaam: string, achternaam: string, telefoonNummer: string, email: string, password: string, passwordConfirmation: string): Observable<boolean> {
        return this.http
            .post(
                `${environment.apiUrl}/Gebruiker/register`,
                { voornaam, achternaam, telefoonNummer, email, password, passwordConfirmation },
                { responseType: 'text' }
            )
            .pipe(
                map((token: any) => {
                    if (token) {
                        const local = JSON.parse(token);
                        localStorage.setItem(this._tokenKey, local.token);
                        localStorage.setItem(
                            'loggedUser',
                            JSON.stringify(local.user)
                        );
                        this.user.next(local.user);
                        return true;
                    } else {
                        return false;
                    }
                })
            );
    }

    get token(): string {
        const localToken = localStorage.getItem(this._tokenKey);
        return !!localToken ? localToken : '';
    }

    public logout(): void {
        if (this.user.getValue()) {
            localStorage.removeItem(this._tokenKey);
            localStorage.removeItem('loggedUser');
            this.user.next(null);
        }
    }

    checkUserNameAvailability = (email: string): Observable<boolean> => {
        return this.http.get<boolean>(
          `${environment.apiUrl}/Gebruiker/checkusername`,
          {
            params: { email }
          }
        );
      };
}

function parseJwt(token) {
    if (!token) {
        return null;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}
