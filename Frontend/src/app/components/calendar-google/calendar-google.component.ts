import { Component, OnInit } from '@angular/core';
import { CalendargoogleService } from 'src/app/services/calendargoogle.service';

@Component({
  selector: 'app-calendar-google',
  templateUrl: './calendar-google.component.html',
  styleUrls: ['./calendar-google.component.css']
})
export class CalendarGoogleComponent implements OnInit {
  constructor(private calendarService: CalendargoogleService) { }
  ngOnInit(): void {
  }
  fromDate: string = "";
  toDate: string = "";

  event: any =
    {
      kind: "calendar#event",
      status: "confirmed",
      summary: "Reunion de prueba desde angular",
      creator: {
        //email del dueño del token
      },

      start: {
        dateTime: "2022-06-24T13:30:00-03:00",
        timeZone: "America/Argentina/Jujuy"
      },

      end: {
        dateTime: "2022-06-24T14:30:00-03:00",
        timeZone: "America/Argentina/Jujuy"
      }
    }




  postEvent() {
    console.log(this.event);
    let fechafrom: Date = new Date(this.fromDate);
    let fechato: Date = new Date(this.toDate);

    this.event.start.dateTime = this.toIsoString(fechafrom);
    this.event.end.dateTime = this.toIsoString(fechato);
    console.log(new Date(fechato).getTimezoneOffset());
    this.calendarService.createEvent(this.event).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }

  //METODO interno que se utiliza para obtener el formato
  //que se requiere en la API de google Calendar. Ej. 2022-06-20T17:04:00-03:00
  toIsoString(date: Date) {
    var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function (num: any) {
        return (num < 10 ? '0' : '') + num;
      };

    return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      dif + pad(Math.floor(Math.abs(tzo) / 60)) +
      ':' + pad(Math.abs(tzo) % 60);
  }


}
