import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { Empleado } from 'src/app/models/empleado';
import { Recurso } from 'src/app/models/recurso';
import { Reunion } from 'src/app/models/reunion';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { ReunionService } from 'src/app/services/reunion.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']

  
})
export class CalendarioComponent implements OnInit {

  reuniones!:Array<Reunion>;
  empleados!:Array<Empleado>;
  recursos!:Array<Recurso>;

  constructor(private empleadoService:EmpleadoService,
              private recursoService:RecursoService,
              private reunionService:ReunionService,
              private router:Router){
                this.cargarEmpleados();
                this.cargarRecursos();
                this.cargarReuniones();
              }


    ngOnInit(): void {
      throw new Error('Method not implemented.');
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

   cargarRecursos()
   {
    this.recursos= new Array<Recurso>();
    this.recursoService.getRecursos().subscribe(
      result=>{
        var unRecurso = new Recurso();
        result.forEach((element:any) => {
          Object.assign(unRecurso,element);
          this.recursos.push(unRecurso);
          unRecurso = new Recurso();
        }); 
        console.log(this.recursos);
      },
      error=>{
 
      }
    )
   }

   cargarReuniones()
   {
    this.reuniones= new Array<Reunion>();
    this.reunionService.getReuniones().subscribe(
      result=>{
        var unReunion = new Reunion();
        result.forEach((element:any) => {
          Object.assign(unReunion,element);
          this.reuniones.push(unReunion);
          unReunion = new Reunion();
        }); 
        console.log(this.reuniones);
      },
      error=>{
 
      }
    )
   }


  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  
  setView(view: CalendarView) {
    this.view = view;
  }

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'First event',
      
    },
    {
      start: startOfDay(new Date(2022, 5, 7, 5, 23, 59)),
      title: 'segundo evento',
      
    }
  ]


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date);
    //let x=this.adminService.dateFormat(date)
    //this.openAppointmentList(x)
  }
/*   

calendario(){
   //assume data from db
  //example: Hospital appointment info
  let data=fromdb();
  for(let x of data)
  {
  this.events = [
            ...this.events,
            {
    start:x["appointment_date"],
    title:x["patient_name"]+x["medical_problem"]
    }
    ]
}
} */


/* dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  console.log(date);
  //this.openAppointmentList(date)
} */




}


