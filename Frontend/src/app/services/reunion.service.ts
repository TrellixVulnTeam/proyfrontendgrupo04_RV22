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

    //Recuperar reuniones por fecha
    public getReunionFecha(dia:string, mes:string):Observable<any>{
      const httpOptions = {
        params: {dia: dia , mes: mes},
        headers: new HttpHeaders({
          'Content-Type':'application/json',
        })
       
      };

      

      return this._http.get(this.urlBase+"reunion/dias/dia/", httpOptions);
    }
  
    //Recuperar reunion por oficina
    public getReunionOficina(nroOficina:string ):Observable<any>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
        }),

      };
      return this._http.get(this.urlBase+"reunion/oficina/nroOficina/?nroOficina="+nroOficina , httpOptions);
    }
  
    //Recuperar reunion por participantes
    public getReunionParticipante(id:string):Observable<any>{
      const httpOptions = {  
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        params: new HttpParams({
            
        })
     };
      return this._http.get(this.urlBase+"reunion/participante/"+id , httpOptions);
    }
  //Recuperar reunion por empleado NO presente
    public getReunionNoParticipante(id:string):Observable<any>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
        })
      };
      return this._http.get(this.urlBase+"reunion/noparticipante/"+id , httpOptions);
    } 

    public getReunionPorLegajo(legajo:string):Observable<any>
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
        })
      };
      return this._http.get(this.urlBase+"reunion/participantes/legajo/"+legajo , httpOptions);
    }
  
  
  
  
  
  
   //////Requeridos para estadistica

  //Recupera las reuniones de un tipo determinado
  public getReunionPorTipo(tipo: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._http.get(this.urlBase + "reunion/tipo/tipo/" + tipo, httpOptions);
  }
  //recupera reuniones a las que fue/es invitado un empleado en determinado mes y año
  public getReunionFiltroPersona(participante: string, mes: string, anio: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),

    };
    
    return this._http.get(this.urlBase + "reunion/filtro/participante/mes/anio/?participantes=" + participante + "&mes=" + mes + "&anio=" + anio, httpOptions);
  }

  //recupera reuniones a las que fue/es/será ocupada un oficina en determinado mes y año
  public getReunionFiltroOficina(oficina: string, mes: string, anio: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),

    };
    return this._http.get(this.urlBase + "reunion/filtro/oficina/mes/anio/?nroOficina=" + oficina + "&mes=" + mes + "&anio=" + anio, httpOptions);
  }

  //recupera tipos de reuniones de un determinado mes y año
  public getReunionFiltroTipo(tipoReunion: string, mes: string, anio: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),

    };
    return this._http.get(this.urlBase + "reunion/filtro/tipo/mes/anio/?tipoReunion=" + tipoReunion + "&mes=" + mes + "&anio=" + anio, httpOptions);
  }


  
  
  
  
  
  
  
  
  
  
  
  
  
  
}
