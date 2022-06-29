import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
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

  fecha!:Date
  horaInicio!:Time;
  horaFinal!:Time;
  empleado!:Empleado;
  participante!:Empleado;
  empleados!:Array<Empleado>;
  participantes!:Array<Empleado>;
  reunion!:Reunion;
  constructor(private reunionService:ReunionService, private empleadoService:EmpleadoService) { }

  ngOnInit(): void {
    this.reunion = new Reunion();
   // this.fecha = new Date();
    this.getEmpleados();
  }

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

  onChangeParticipante($event:any){
    console.log(this.participantes);
    this.participantes = new Array<Empleado>();
    
    const id = $event.target.value;
    const isChecked = $event.target.checked;

    this.empleados.map((emp) => {
      if(isChecked==true)
      
        this.participante = new Empleado();
        Object.assign(this.participante,emp);
        this.participantes.push(this.participante);
    })
  //  console.log(this.participantes);

  }
}
