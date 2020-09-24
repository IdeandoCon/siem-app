import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  base_path = 'https://vigorous-chandrasekhar-2ee519.netlify.app';
  municipalidad:any;

  constructor(private http: HttpClient, private cookies: CookieService) { }



  login(usuario: any, municipalidad:any): Observable<any> {
    return this.http.post("http://localhost:3000/login", usuario);
  }


  setMunicipalidad(municipalidad: string) {
    this.cookies.set("municipalidad", municipalidad);
  }
  getMunicipalidad() {
    return this.cookies.get("municipalidad");
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getLogos(): Observable<any> {
    return this.http
      .get<any>(this.base_path + '/logos.json')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}

