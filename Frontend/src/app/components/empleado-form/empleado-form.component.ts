import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { Usuario } from 'src/app/models/usuario';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit {

  accion="";
  empleado!:Empleado;
  usuarios!:Array<Usuario>;
  constructor(private activatedRoute:ActivatedRoute,
              private empleadoService:EmpleadoService,
              private loginService:LoginService,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if(params['id'] == "0")
      {
        this.accion = "new";
        this.cargarUsuarios();
        this.iniciarEmpleado();
      }
      else
      {
        this.accion = "update";
        this.cargarUsuarios();
        this.cargarEmpleado(params['id']);
      }
    })
  }

  iniciarEmpleado(){
    this.empleado = new Empleado();
  }

  cargarEmpleado(id:string){
    this.empleado = new Empleado();
    this.empleadoService.getEmpleado(id).subscribe(
      result=>{
        Object.assign(this.empleado, result);
        this.empleado.user = this.usuarios.find((item)=>(item._id==this.empleado.user._id))!;
        console.log(this.empleado);
      },
      error=>{

      }
    )
  }

  cargarUsuarios(){
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

  cerrar(){
    this.router.navigate(['empleado']);
  }

  guardarEmpleado(){
    this.empleadoService.createEmpleado(this.empleado).subscribe(
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

  actualizarEmpleado(){
    this.empleadoService.updateEmpleado(this.empleado).subscribe(
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

}
