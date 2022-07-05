import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userform: Usuario = new Usuario(); //usuario mapeado al formulario
  returnUrl!: string;
  msglogin!: string; // mensaje que indica si no paso el loguin
 

   constructor(
     private route: ActivatedRoute,
     private router: Router,
     private loginService:LoginService){
       this.userform = new Usuario();
  }
   ngOnInit() {
   
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
  }
 
    login() {
     
     this.loginService.login(this.userform.username, this.userform.password).subscribe(
     (result) => {
      var user = result;
      if (user.status == 1){
        //guardamos el tokek localmente
        sessionStorage.setItem("token", user.token);
        //guardamos el user en cookies en el cliente
        sessionStorage.setItem("user", user.username);
        sessionStorage.setItem("userid", user.userid);
        sessionStorage.setItem("perfil", user.perfil);
        //redirigimos a home o a pagina que llamo
        if(user.perfil=="administrador"){
          this.router.navigateByUrl(this.returnUrl);
          //  alert("¡BIENVENIDO!");
            //alertas
            Swal.fire({
              title: '¡BIENVENIDO ADMIN!',
              width: 600,
              timer: 3000,
              padding: '3em',
              color: '#716add',
              background: '#fff url(/assets/img/pollo-man.gif)',
              backdrop: `
                rgba(0,0,123,0.4)
                url("/images/nyan-cat.gif")
                left top
                no-repeat
              `
            })
            //una vez logueado nos dirigira a.
            this.router.navigate(['listarReunion'])
          } else {
            if(user.perfil=="participante"){

              this.router.navigateByUrl(this.returnUrl);
              //  alert("¡BIENVENIDO!");
                //alertas
                Swal.fire({
                  title: '¡BIENVENIDO PARTICIPANTE!',
                  width: 600,
                  timer: 3000,
                  padding: '3em',
                  color: '#716add',
                  background: '#fff url(/assets/img/pollo-man.gif)',
                  backdrop: `
                    rgba(0,0,123,0.4)
                    url("/images/nyan-cat.gif")
                    left top
                    no-repeat
                  `
                })
                //una vez logueado nos dirigira a.
                this.router.navigate(['listarReunion'])
              } 
          }

      }else{
        Swal.fire({
          icon: 'error',
          title: 'Credenciales incorrectas..',
          text: 'intente de nuevo',     
        })
      }
    },
     error => {
       alert("Error de conexion");
       console.log("error en conexion");
       console.log(error);
       });
   }
 
 

}
