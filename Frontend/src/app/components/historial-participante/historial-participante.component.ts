import { Component, OnInit } from '@angular/core';
import { id } from 'date-fns/locale';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/services/reunion.service';

@Component({
  selector: 'app-historial-participante',
  templateUrl: './historial-participante.component.html',
  styleUrls: ['./historial-participante.component.css']
})
export class HistorialParticipanteComponent implements OnInit {

  constructor(private reunionService:ReunionService) { }

  reuniones!:Array<Reunion>;
  ngOnInit(): void {
  }


  getHistorialReuniones(id:string){
    this.reunionService.getReunionParticipante(id).subscribe(
      (result) =>{
      
        console.log(result);
      }      
    )
  }

}
