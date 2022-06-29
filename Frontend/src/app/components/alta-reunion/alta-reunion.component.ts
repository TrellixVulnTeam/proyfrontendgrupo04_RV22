import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { Reunion } from 'src/app/models/reunion';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ReunionService } from 'src/app/services/reunion.service';

@Component({
  selector: 'app-alta-reunion',
  templateUrl: './alta-reunion.component.html',
  styleUrls: ['./alta-reunion.component.css']
})
export class AltaReunionComponent implements OnInit {

  fecha!:Date;
  horaInicio!:String;
  horaFinal!:String;
  empleado!:Empleado;
  participante!:Empleado;
  empleados!:Array<Empleado>;
  participantes!:Array<Empleado>;
  reunion!:Reunion;
  constructor(private reunionService:ReunionService, private empleadoService:EmpleadoService) { }

ngOnInit(): void {
    this.participantes = new Array<Empleado>();
    this.reunion = new Reunion();
    this.fecha = new Date();
    this.getEmpleados();
}


// ******************************** Implementacion de servicios ********************************

getEmpleados()
{
    this.empleadoService.getEmpleados().subscribe(
      (result) => {
        this.empleados = new Array<Empleado>();
        result.forEach((element:any)=>{
          this.empleado = new Empleado();
          Object.assign(this.empleado,element);
          this.empleados.push(this.empleado);
        })
      },
    )
}


altaReunion()
{
  this.manejoDeFechaHora()
  console.log(this.reunion);
  this.reunionService.postReunion(this.reunion).subscribe(
    (result) => {
        console.log("56 "+ result);
    },
  )
  
}




// ******************************** Gestion de fecha y hora ********************************

manejoDeFechaHora()
{  
  
  this.reunion.dia= this.fecha.getDate().toString();
  this.reunion.mes= this.fecha.getMonth().toString();
  this.reunion.anio= this.fecha.getFullYear().toString(); 

  this.reunion.horaComienzo= this.horaInicio;
  this.reunion.horaFinal= this.horaFinal;

  this.reunion.participantes = this.participantes;
  this.reunion.estado = "Pendiente";
}




// ******************************** Control de los participantes ********************************

addRemoveEmpleado(emp:Empleado, $event:any)
{
    if ( $event.checked ==true){
        this.addEmpleado(emp);
    }else {
        this.removeEmpleado(emp);
    }
    console.log ("Participantes: ", this.participantes);
}
  
addEmpleado(empleado:Empleado): void {
  if (!this.UserExists(empleado)){
      this.participantes.push(empleado);
  }
}
removeEmpleado(empleado:Empleado): void {
  for (var _i = 0; _i < this.participantes.length; _i++) {
      if (this.participantes[_i]._id==empleado._id){
          this.participantes.splice( _i, 1 )
      }
  }
}
UserExists (empleado:Empleado): boolean {
  let exists = false;
  for (var _i = 0; _i < this.participantes.length; _i++) {
      if (this.participantes[_i]._id==empleado._id){
          exists = true;
      }
  }
  return exists;
}

}
