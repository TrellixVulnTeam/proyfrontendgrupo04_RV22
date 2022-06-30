import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendargoogleService {
  apiKey = ''; //token generado para autorizar uso de la api
  idCalendar = ''; //id del calendadario creado
  urlGoogle = 'https://www.googleapis.com/calendar/v3/calendars/';
  constructor(private _http: HttpClient) {}
  createEvent(event: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearet ' + this.apiKey,
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };
    let body = JSON.stringify(event);
    //console.log(body);
    return this._http.post(
      this.urlGoogle + this.idCalendar + '/event',
      body,
      httpOptions
    );
  }
}
