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
  recursosDigital!:Array<Recurso>;
  recursosFisico!:Array<Recurso>;
  constructor(private recursoService:RecursoService, private router:Router) { }

  ngOnInit(): void {
    this.getRecursosDigital();
    this.getRecursosFisico();
  }

  async getRecursosDigital(){

    this.recursoService.getRecursoTipo("Digital").subscribe(
      (result) => {
        console.log(result);
          this.recursosDigital = new Array<Recurso>();
          result.forEach((element:any)=> {
            this.recurso = new Recurso();
              Object.assign(this.recurso,element);
              this.recursosDigital.push(this.recurso);
            
          });
      }
    )
  }

  async getRecursosFisico(){
    await this.getRecursosDigital();
    this.recursoService.getRecursoTipo("Fisico").subscribe(
      (result) => {
        console.log(result);
          this.recursosFisico = new Array<Recurso>();
          result.forEach((element:any)=> {
            this.recurso = new Recurso();
              Object.assign(this.recurso,element);
              this.recursosFisico.push(this.recurso);
            
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

  modificarRecurso(id:String){
    this.router.navigate(['altaRecurso/'+id]);
  }

  altaRecurso(){
    this.router.navigate(['altaRecurso/0']);
  }

}
