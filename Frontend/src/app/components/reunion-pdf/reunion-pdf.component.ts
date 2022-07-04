import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/services/reunion.service';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import * as printJS from 'print-js';

@Component({
  selector: 'app-reunion-pdf',
  templateUrl: './reunion-pdf.component.html',
  styleUrls: ['./reunion-pdf.component.css']
})
export class ReunionPdfComponent implements OnInit {

  accion!:string;
  url!:string;
  constructor(private activateRoute:ActivatedRoute, private reunionService: ReunionService) {   }
  reunion!:Reunion;
  ngOnInit(): void {
    this.activateRoute.params.subscribe(params =>{
      
      if(params['id'] == '0'){
        this.accion="new";
     
      }
      else{
        this.buscarReunionID(params['id']);
        this.url = "localhost:4200/reunionpdf/"+params['id'];
        //this.getPersonas();
      }
    }) 
  
  }
  buscarReunionID(reunionID:string)
  {
    this.reunion= new Reunion();
    this.reunionService.getReunionId(reunionID).subscribe(
      (result)=>{
        Object.assign(this.reunion,result);
        console.log(result);
      },
    )

  }

//******************************** Generar QR ********************************
    title = 'qr-code';

    ulr= this.url;
    profile='routeToMyProfile';
    elementType=NgxQrcodeElementTypes.URL;
    errorCorrectionLevel=NgxQrcodeErrorCorrectionLevels.HIGH;
    value=this.ulr+this.profile;


     // ******************************** Generar PDF ********************************
imprimir(){

  printJS('document.URL','html');

 /*  printJS(
    {
      printable:'./reunion-pdf.component.html', 
      type:'html',
      style:'.special-element { visibility: visible; }'
    }
  ) */
}

}
