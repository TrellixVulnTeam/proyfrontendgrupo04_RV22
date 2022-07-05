import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recurso } from 'src/app/models/recurso';
import { RecursoService } from 'src/app/services/recurso.service';

@Component({
  selector: 'app-listar-recurso',
  templateUrl: './listar-recurso.component.html',
  styleUrls: ['./listar-recurso.component.css']
})
export class ListarRecursoComponent implements OnInit {

  recurso!:Recurso;
  recursos!:Array<Recurso>;
  constructor(private recursoService:RecursoService, private router:Router) { }

  ngOnInit(): void {
    this.getRecursos();
  }

  async getRecursos(){

    this.recursoService.getRecursos().subscribe(
      (result) => {
          this.recursos = new Array<Recurso>();
          result.forEach((element:any)=> {
            this.recurso = new Recurso();
            Object.assign(this.recurso,element);
            this.recursos.push(this.recurso);
          });
      }
    )
  }

  deleteRecurso(id:string){
     this.recursoService.deleteRecurso(id).subscribe(
      (result) => {
        console.log(result);
      } );
  }

  modificarRecurso(){

  }

  redirigir(){
    this.router.navigate(['altaRecurso']);
  }

}
