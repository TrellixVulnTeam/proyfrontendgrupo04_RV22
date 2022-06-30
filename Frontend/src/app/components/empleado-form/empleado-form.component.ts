import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit {

  accion="";
  empleado!:Empleado;
  constructor(private activatedRoute:ActivatedRoute,
              private empleadoService:EmpleadoService,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if(params['id'] == "0")
      {
        this.accion = "new";
        this.iniciarEmpleado();
      }
      else
      {
        this.accion = "update";
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
        console.log(this.empleado);
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
