import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  empleados!:Array<Empleado>;
  constructor(private empleadoService:EmpleadoService, private router:Router) {
    this.cargarEmpleados();
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

   agregarEmpleado(){
    this.router.navigate(['empleado-form',0])
   }

   modificarEmpleado(empleado:Empleado){
    this.router.navigate(['empleado-form',empleado._id])
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
}
