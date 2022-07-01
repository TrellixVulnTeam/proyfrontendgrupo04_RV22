import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  hostBase: string;
  constructor(private _http:HttpClient) {
  this.hostBase = "http://localhost:3000/api/usuario/";
  }
  public login(username: string, password: string):Observable<any> {
     const httpOption = {
     headers: new HttpHeaders({
     'Content-Type': 'application/json'
     })
  }
   let body = JSON.stringify({ username: username, password: password });
   console.log(body);
  return this._http.post(this.hostBase + 'login', body, httpOption);
  }
  //obtener usuarios
  getUsuarios():Observable<any>{
    const httpOptions = {  
      headers: new HttpHeaders({
        
      }),
      params: new HttpParams({

      })
  };
    return this._http.get("http://localhost:3000/api/usuario",httpOptions); 
  }
  public logout() {
     //borro el vble almacenado mediante el storage
      sessionStorage.removeItem("user");
     sessionStorage.removeItem("perfil");
     sessionStorage.removeItem("userid"); 

    // reseteo las propiedades del service que indican
    // que un usuario esta logueado y cual es el usuario logueado
  //  this.userLogged = new Usuario();
 //   this.userLoggedIn = false;
    //borro el token almacenado mediante el storage
  //  sessionStorage.removeItem("token");

  } 
 
  public userLoggedIn(){
   var resultado = false;
   var usuario = sessionStorage.getItem("user");
   if(usuario!=null){
     resultado = true;
   }
   return resultado;
 }
 
 public userLogged(){
    var usuario = sessionStorage.getItem("user");
    return usuario;
 }
 
 public idLogged(){
   var id = sessionStorage.getItem("userid");
   return id;
   }

//retorna el contenido del token
public getToken():string{
  if (sessionStorage.getItem("token")!= null){
  return sessionStorage.getItem("token")!;
  }else{
  return "";
  }
  }
}