import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  urlBase:string = "http://localhost:3000/api/";
  constructor(private _http:HttpClient) { 

  }
  getEmpleados():Observable<any>{
    const httpOptions = {  
      headers: new HttpHeaders({
      }),
      params: new HttpParams({

      })
  };
    return this._http.get(this.urlBase+"empleado",httpOptions); 
  }
}
