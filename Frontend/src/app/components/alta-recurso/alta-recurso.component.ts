import { Component, OnInit } from '@angular/core';
import { Recurso } from 'src/app/models/recurso';
import { RecursoService } from 'src/app/services/recurso.service';

@Component({
  selector: 'app-alta-recurso',
  templateUrl: './alta-recurso.component.html',
  styleUrls: ['./alta-recurso.component.css']
})
export class AltaRecursoComponent implements OnInit {

  constructor(private recursoService:RecursoService) { }
  tipo!:string;
  nombre!:string;
  stock!:number;
  recurso!:Recurso;
  ngOnInit(): void {
  }

  postRecurso(){
    this.recurso = new Recurso();
    this.recurso.tipo = this.tipo;
    this.recurso.nombre = this.nombre;
    this.recurso.cantidad = this.stock;
    console.log(this.recurso);
    this.recursoService.postRecurso(this.recurso).subscribe(
      (result) => {
        console.log(result);
      }
    )
  }

}
