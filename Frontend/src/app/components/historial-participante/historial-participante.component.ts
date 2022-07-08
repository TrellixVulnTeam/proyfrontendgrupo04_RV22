import { Component, OnInit } from '@angular/core';
import { id } from 'date-fns/locale';
import { Reunion } from 'src/app/models/reunion';
import { LoginService } from 'src/app/services/login.service';
import { ReunionService } from 'src/app/services/reunion.service';

@Component({
  selector: 'app-historial-participante',
  templateUrl: './historial-participante.component.html',
  styleUrls: ['./historial-participante.component.css']
})
export class HistorialParticipanteComponent implements OnInit {

  constructor(private reunionService:ReunionService,private loginService:LoginService) { 
    this.recuperarPasajes()
  }
  id:string=this.loginService.idLogged();
  reunion!:Reunion;
  reuniones!:Array<Reunion>;
  ngOnInit(): void {
  }


/*   getHistorialReuniones(){
    this.reunionService.getReunionParticipante('62bdfed340cc7ecd9dd03bea').subscribe(
      (result) =>{
      
        console.log(result);
      }      
    )
  } */
  recuperarPasajes(){
    this.reunionService.getReunionParticipante('62c3bbe94401d30e30eba846').subscribe(
      result=>{
        this.reuniones= new Array<Reunion>();
        result.forEach((element:any) => {
          this.reunion=new Reunion();
          Object.assign(this.reunion,element);
         this.reuniones.push(this.reunion);       
        });
        console.log(this.loginService.idLogged());
        console.log(result);
      },
      error=>{
          console.log("error")
      } 
    );
  }

}
