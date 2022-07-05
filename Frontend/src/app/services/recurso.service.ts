import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recurso } from '../models/recurso';
import { Reunion } from '../models/reunion';

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

  updateRecurso(reunion:Reunion):Observable<any>{
    const httpOptions = {  
      headers: new HttpHeaders({
        "Content-Type":"application/json"
      }),
      params: new HttpParams({

      })
  };
  let body = JSON.stringify(reunion);
    return this._http.put(this.urlBase+"recurso/"+reunion._id,body,httpOptions); 
  }

  deleteRecurso(id:string){
    const httpOptions = {  
      headers: new HttpHeaders({
        "Content-Type":"application/json"
      }),
      params: new HttpParams({

      })
  };
    return this._http.delete(this.urlBase+"recurso/"+id,httpOptions); 
  }

}
