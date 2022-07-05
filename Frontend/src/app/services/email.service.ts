import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from '../models/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  urlbase: string = 'http://localhost:3000/api/';
  apibase: string = 'api/send/';
  urlapi: string = this.urlbase + this.apibase;
  type: string = '';
  constructor(private readonly _http: HttpClient) { }



  public addPasaje(email: Email): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': this.type,
      }),
    };
    const body = new HttpParams()
      .set('destinatarios', email.destinatarios)
      .set('asunto', email.asunto)
      .set('mensaje', email.mensaje);
    const _url = this.urlapi
    return this._http.post(_url, body, httpOptions);
  }


}
