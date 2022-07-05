import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from '../models/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  urlbase: string = '';
  apibase: string = '';
  urlapi: string = this.urlbase + this.apibase;
  type: string = '';
  constructor(private readonly _http: HttpClient) { }



  public addPasaje(email: Email): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': this.type,
      }),
      params: new HttpParams({}),
    };
    const _url = this.urlapi;
    let body = JSON.stringify(email);
    console.log(body);
    return this._http.post(_url, body, httpOptions);
  }


}
