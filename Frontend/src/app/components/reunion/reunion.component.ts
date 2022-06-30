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
  console.log(reunion);
  let reunionTemp = [{
        Tema:reunion.temaReunion,
        Tipo:reunion.tipoReunion,
        Dia: reunion.dia,
        Mes: reunion.mes,
        Comienzo: reunion.horaComienzo,
        Final: reunion.horaFinal,
        Estado:reunion.estado
  }]
  printJS(
    {
      header:'-Nombre de Empresa-',
      imageStyle:'../../../assets/img/iniciar-sesion.png',
      printable:reunionTemp, 
      type:'json',
      properties:['Tema','Tipo','Dia','Mes','Comienzo','Final','Estado'],
      font: 'TimesNewRoman',
      font_size: '14pt',
      gridHeaderStyle: 'font-weight: bold; padding: 5px; border: 1px solid #dddddd;',
      gridStyle: 'border: 1px solid lightgray; margin-bottom: -1px;',
      modalMessage: 'Retrieving Document...',
    }
  )
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
