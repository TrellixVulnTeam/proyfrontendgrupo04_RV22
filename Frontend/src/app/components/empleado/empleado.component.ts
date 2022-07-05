import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { Usuario } from 'src/app/models/usuario';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  empleados!:Array<Empleado>
  usuarios!:Array<Usuario>
  constructor(private empleadoService:EmpleadoService,
              private loginService:LoginService,
              private router:Router) {
    this.cargarEmpleados();
    this.cargarUsuarios();
   }

  ngOnInit(): void {
  }
  cargarEmpleados()
   {
    this.empleados = new Array<Empleado>();
    this.empleadoService.getEmpleados().subscribe(
      result=>{
        var unEmpleado = new Empleado();
        result.forEach((element:any) => {
          Object.assign(unEmpleado,element);
          this.empleados.push(unEmpleado);
          unEmpleado = new Empleado();
        }); 
        console.log(this.empleados);
      },
      error=>{
 
      }
    )
   }

   cargarUsuarios()
   {
    this.usuarios = new Array<Usuario>();
    this.loginService.getUsuarios().subscribe(
      result=>{
        var unUsuario = new Usuario();
        result.forEach((element:any) => {
          Object.assign(unUsuario,element);
          this.usuarios.push(unUsuario);
          unUsuario = new Usuario();
        }); 
        console.log(this.usuarios);
      },
      error=>{
 
      }
    )
   }

   agregarEmpleado(){
    this.router.navigate(['empleado-form',0])
   }
   agregarUsuario(){
    this.router.navigate(['usuario-form',0])
   }
   modificarEmpleado(empleado:Empleado){
    this.router.navigate(['empleado-form',empleado._id])
   }

   modificarUsuario(usuario:Usuario){
    this.router.navigate(['usuario-form',usuario._id])
   }
   borrarEmpleado(empleado:Empleado){
    this.empleadoService.deleteEmpleado(empleado._id).subscribe(
      result=>{
        if(result.status=="1")
        {
          //toast
          alert(result.msg);
          this.cargarEmpleados();
        }
      },
      error=>{
        if(error.status=="0")
        {
          alert(error.msg);
        }
      }
    )
   }
   borrarUsuario(usuario:Usuario){
    this.loginService.deleteUsuario(usuario._id).subscribe(
      result=>{
        if(result.status=="1")
        {
          //toast
          alert(result.msg);
          this.cargarUsuarios();
        }
      },
      error=>{
        if(error.status=="0")
        {
          alert(error.msg);
        }
      }
    )
   }
}