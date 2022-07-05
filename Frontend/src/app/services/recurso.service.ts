import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
      params: new HttpParams({

      }),
    }
    return this._http.get(this.urlBase+"recurso/tipo/"+tipo, httpOptions);
  }

  updateRecurso(recurso:Recurso):Observable<any>{
    const httpOptions = {  
      headers: new HttpHeaders({
        "Content-Type":"application/json"
      }),
      params: new HttpParams({

      })
  };
  let body = JSON.stringify(recurso);
    return this._http.put(this.urlBase+"recurso/"+recurso._id,body,httpOptions); 
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

  getRecursoId(id:string){
    const httpOptions = {  
      headers: new HttpHeaders({
        "Content-Type":"application/json"
      }),
      params: new HttpParams({

      })
  };
    return this._http.get(this.urlBase+"recurso/"+id,httpOptions); 
  }

}
