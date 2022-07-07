import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthAGuard implements CanActivate {
  constructor(private loginService :LoginService,private router:Router){}
  pase1:boolean;
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.loginService.userLoggedInAdmin()==true){
        this.pase1=true;
      }else{
        Swal.fire({
          icon: 'error',
          title: 'USTED NO ES UN ADMINISTRADOR',
          text: 'Intente ingresar con una cuenta de participante!',
          footer: '<a href="https://www.youtube.com/shorts/je43BDo8t3U" target="_blank">¿Por qué tengo este problema?</a>'
        })
        this.pase1=false;
        this.router.navigate(['home']);
      }
    return this.pase1;
  }
  
}
