import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/services/reunion.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.css']
})
export class ReunionComponent implements OnInit {
  reuniones!:Array<Reunion>;
  reunion!:Reunion;
  constructor(private reunionService:ReunionService, private router:Router) { }

  ngOnInit(): void {
    this.getReuniones();
  }

  // ******************************** Generar PDF ********************************
imprimir(reunion:Reunion){
  alert("Imprimiendo Reunion");
  let reunionPrint:any  = this.procesarListado(reunion);
  printJS({printable:reunionPrint, properties:['Tema','Tipo','horaComienzo','horaFinal','Estado'], type:'json'})
}

procesarListado(reunion:Reunion):Array<any>{
  let reunionProcess:Array<any> = Array<any>();
    
      let reunionTemp = {
        Tema:reunion.temaReunion,
        Tipo:reunion.tipoReunion,
        horaComienzo: reunion.horaComienzo,
        horaFinal: reunion.horaFinal,
        Estado:reunion.estado
      }
      reunionProcess.push(reunionTemp);
      console.log(reunionTemp);
    
    return reunionProcess;
}

// ******************************** Implementacion de servicios ********************************

  getReuniones()
  {
    this.reunionService.getReuniones().subscribe(
      (result) => {
        console.log(result);
        this.reuniones = new Array<Reunion>();
        result.forEach((element:any )=>{
          this.reunion = new Reunion();
          Object.assign(this.reunion,element);
          this.reuniones.push(this.reunion);
        })
      },
    )
  }

  altaReunion(){
    this.router.navigate(['altaReunion']);
  }

  borrarReunion(reunion:Reunion){

     this.reunionService.deleteReunion(reunion).subscribe(
      (result) => {
        console.log("Reunion eliminada");
      },
    )
    this.getReuniones(); 
  }

  modificarReunion(){

  }
}
