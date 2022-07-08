import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Reunion } from 'src/app/models/reunion';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { ReunionService } from 'src/app/services/reunion.service';

@Component({
  selector: 'app-agenda-participante',
  templateUrl: './agenda-participante.component.html',
  styleUrls: ['./agenda-participante.component.css']
})
export class AgendaParticipanteComponent implements OnInit {
  userform: Usuario = new Usuario(); //usuario mapeado al formulario
  reunionesFiltro!: Array<Reunion>;
  reuniones!: Array<Reunion>;
  reunion!: Reunion;
  eq!:any;

  modalRef?: BsModalRef;
  title:any;
  //presentDays: number = 0;
  //absentDays: number = 0;
  //{title: 'Present', date: '2022-07-07', color: '#0000FF'},
  events:any = [
    {title: 'Eventos', date: new Date()},
  ]
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: this.events,
    eventClick: this.handleDateClick.bind(this),
  };

  config = {
    animated: true
  };
  @ViewChild('template') template!:string;
  start:any;
  constructor(private modalService: BsModalService,
              private reunionService: ReunionService,
              private loginService: LoginService,
              private router: Router) { }
  ngOnInit(): void {
    this.getReuniones();
    //this.events.forEach((e: { [x: string]: string; }) => {
      //if(e["title"] == 'Present')
      //{
        //this.presentDays++;
      //}
      //else
      //{
        //this.absentDays++
      //}
    //});
    //console.log("Present "+this.presentDays);
    //console.log("Absent "+this.absentDays);
  }
  handleDateClick(arg:any)
  {
    //console.log(arg);
    //console.log(arg.event._def.title);
    this.title = arg.event._def.title;
    this.start = arg.event.start;
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  
  async getReuniones() {
    this.loginService.login(this.userform.username, this.userform.password)
    console.log(this.userform);
    {
      this.reunionService.getReuniones().subscribe(
        (result) => {
          console.log(result);
          this.reuniones = new Array<Reunion>();
          this.reunionesFiltro = new Array<Reunion>();
  
          result.forEach((element: any) => {
            this.reunion = new Reunion();
            Object.assign(this.reunion, element);
            this.reuniones.push(this.reunion);
          })
        },
      )
    }
  }
}
