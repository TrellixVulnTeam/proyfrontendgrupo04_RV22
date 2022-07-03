import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recurso } from '../models/recurso';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  urlBase:string = "http://localhost:3000/api/"
  constructor(private _http:HttpClient) { }

  public getRecursos():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Contet-Type':'application/json'
      }),
    };
    return this._http.get(this.urlBase+"recurso",httpOptions);
  }

  public postRecurso(recurso:Recurso):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Contet-Type':'application/json'
      }),
    }
    return this._http.post(this.urlBase+"recurso", recurso, httpOptions);
  }

  public getRecursoTipo(tipo:string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Contet-Type':'application/json'
      }),
    }
    return this._http.post(this.urlBase+"recurso/tipo/"+tipo, httpOptions);
  }


}
