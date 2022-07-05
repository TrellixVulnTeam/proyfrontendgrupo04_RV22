import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Recurso } from 'src/app/models/recurso';
import { RecursoService } from 'src/app/services/recurso.service';

@Component({
  selector: 'app-alta-recurso',
  templateUrl: './alta-recurso.component.html',
  styleUrls: ['./alta-recurso.component.css']
})
export class AltaRecursoComponent implements OnInit {

  tipo!:String;
  nombre!:String;
  stock!:number;
  recurso!:Recurso;
  accion!:Boolean;
  esconderDigital:Boolean=false;
  formRecurso: FormGroup ;

  constructor(private recursoService:RecursoService,private activateRoute:ActivatedRoute,private fb:FormBuilder) { 
    this.formRecurso = this.fb.group({
      tipoRecurso : ['', Validators.required],
      nombreRecurso : ['', Validators.required],
      stockRecurso : ['', Validators.required],     
  })
  }


    
  ngOnInit(): void {
    this.activateRoute.params.subscribe(params =>{
      
      if(params['id'] == '0'){
        this.accion=false;
       this.recurso= new Recurso();
      }
      else{
        this.accion=true;
        this.getRecursoId(params['id']);
      }
    }) 

  }

  postRecurso(){
    this.recurso = new Recurso();
    console.log(this.recurso);
    this.recursoService.postRecurso(this.recurso).subscribe(
      (result) => {
        console.log(result);
      }
    )
  }

  editarRecurso(){
    this.recurso = new Recurso();
    console.log(this.recurso);
    this.recursoService.updateRecurso(this.recurso).subscribe(
      (result) => {
        console.log(result);
      }
    )
  }


  getRecursoId(id:string){
    this.recurso = new Recurso();
    this.recursoService.getRecursoId(id).subscribe(
      (result) => {
        console.log(result)
        Object.assign(this.recurso,result);
      }
    )
  }


  // ***************** Control ********************

  controlRecurso()
  { 
    let d = document.getElementById("stockRecurso") as HTMLInputElement;
    if(this.recurso.tipo=="Digital")
    {
      this.esconderDigital=true;
      this.recurso.cantidad=1;
      d.disabled = true;
      
    }
    else
    {
      d.disabled = false;
    }
    
  }

}
