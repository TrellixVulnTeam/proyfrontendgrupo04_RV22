import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { COLORS } from 'html2canvas/dist/types/css/types/color';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/services/reunion.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']

  
})
export class CalendarioComponent implements OnInit {

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  events: CalendarEvent[] = [
      /* {
        start: new Date('2022-07-05'),
        end: new Date('2022-07-05'),
        title: 'One day excluded event',
      } */
    ]



  reunion!:Reunion;
  reunionesGuardadas!:Array<Reunion>;
  constructor(private reunionService:ReunionService, private activateRoute:ActivatedRoute) 
 {

 }

  ngOnInit(): void {
    this.getReuniones();
    this.calendario();
}



// *************************  Traer Reuniones ******************************
getReuniones(){
  this.reunionService.getReuniones().subscribe(
    (result) => {
      console.log(result);
      this.reunionesGuardadas = new Array<Reunion>();
      result.forEach((element: any) => {
        this.reunion = new Reunion();
        Object.assign(this.reunion, element);
        this.reunionesGuardadas.push(this.reunion);
      })
    },
  )
}







  setView(view: CalendarView) {
    this.view = view;
  }



  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date);
    //let x=this.adminService.dateFormat(date)
    //this.openAppointmentList(x)
  }
   

calendario(){
  this.reunionesGuardadas.forEach(element => {
    this.events = [
                    {
                      start: new Date(),
                      end: new Date(),
                      title: 'One day excluded event',
                    }
                  ]
  });


  } 
}
  

  




/* dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  console.log(date);
  //this.openAppointmentList(date)
} */




