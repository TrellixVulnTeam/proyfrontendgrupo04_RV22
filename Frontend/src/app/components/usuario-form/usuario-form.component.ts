import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { Usuario } from 'src/app/models/usuario';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {
  valido!:boolean;

  accion="";
  usuario!:Usuario;
  empleados!:Array<Empleado>;

  perfilop!:Array<any>;
  constructor(private activatedRoute:ActivatedRoute,
              private empleadoService:EmpleadoService,
              private loginService:LoginService,
              private router:Router) {
                this.perfilop = ['administrador','participante'];
                this.valido = false;
              }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if(params['id'] == "0")
      {
        this.accion = "new";
        this.cargarEmpleados();
        this.iniciarUsuario();
        this.usuario.username = "";
        this.usuario.password = "";
        this.usuario.perfil = "";
      }
      else
      {
        this.accion = "update";
        this.cargarEmpleados();
        this.cargarUsuario(params['id']);
      }
    })
  }

  iniciarUsuario(){
    this.usuario = new Usuario();
  }

  cargarUsuario(id:string){
    this.usuario = new Usuario();
    this.loginService.getUsuario(id).subscribe(
      result=>{
        Object.assign(this.usuario, result);
        console.log(this.usuario);
      },
      error=>{

      }
    )
  }
  cargarEmpleados(){ 
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

  cerrar(){
    this.router.navigate(['empleado']);
  }

  guardarUsuario(){
    this.valido = true;
    if(this.usuario.username !='' && this.usuario.password !='' && this.usuario.perfil != '')
    {
    this.loginService.createUsuario(this.usuario).subscribe(
      result=>{
        if(result.status=="1")
        {
          //toast
          alert(result.msg);
          this.router.navigate(['empleado']);
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
  else
    {
      console.log("error");
    }
  }

  actualizarUsuario(){
    this.valido = true;
    if(this.usuario.username !='' && this.usuario.password !='' && this.usuario.perfil != '')
    {
    this.loginService.updateUsuario(this.usuario).subscribe(
      result=>{
        if(result.status=="1")
        {
          //toast
          alert(result.msg);
          this.router.navigate(['empleado']);
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
  else
    {
      console.log("error");
    }
  }
}