import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfDay } from 'date-fns';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']

  
})
export class CalendarioComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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


