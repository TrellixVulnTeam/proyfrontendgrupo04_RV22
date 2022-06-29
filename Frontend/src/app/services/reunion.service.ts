import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reunion } from '../models/reunion';

@Injectable({
  providedIn: 'root'
})
export class ReunionService {

  urlBase:string = "http://localhost:3000/api/";
  constructor(private _http:HttpClient) {  }

  // Traer todas las reuniones
  public getReuniones():Observable<any>{
    const httpOptions = {  
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({

      })
   };
   return this._http.get(this.urlBase+"reunion",httpOptions);
  }

  // Guarda una reunion
  public postReunion(reunion:Reunion):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
      }),
    };
    let body = JSON.stringify(reunion);
    return this._http.post(this.urlBase+"reunion", body, httpOptions );
  }

  //Trae reunion por id
  public getReunionId(id:String):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
      })
    };
    return this._http.get(this.urlBase+"reunion/"+id , httpOptions);
  }

  //Editar reunion
  public editeReunion(reunion:Reunion):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
      })
    };
    let body = JSON.stringify(reunion);
    return this._http.put(this.urlBase+"reunion/"+reunion._id , body, httpOptions);
  }

  //Borrar reunion
  public deleteReunion(reunion:Reunion):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
      })
    };
    return this._http.delete(this.urlBase+"reunion/"+reunion._id , httpOptions);
  }


}
