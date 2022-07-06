import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/services/reunion.service';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import * as printJS from 'print-js';

import html2canvas from 'html2canvas';
import jspdf from 'jspdf';


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
        this.url = 'http://localhost:4200/reunionpdf/'+params['id'];
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
ulr= '';
profile='routeToMyProfile';
elementType=NgxQrcodeElementTypes.URL;
errorCorrectionLevel=NgxQrcodeErrorCorrectionLevels.HIGH;
value=this.ulr+this.profile;

     // ******************************** Generar PDF ********************************
title1 = 'html-to-pdf-angular-application';
public convetToPDF()
{
var data = document.getElementById('contentToConvert');
html2canvas(data).then(canvas => {
  // Few necessary setting options
  var imgWidth = 208;
  var pageHeight = 295;
  var imgHeight = canvas.height * imgWidth / canvas.width;
  var heightLeft = imgHeight;
  
  const contentDataURL = canvas.toDataURL('image/png')
  let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
  var position = 0;
  pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  pdf.save('new-file.pdf'); // Generated PDF
  });
}

}


